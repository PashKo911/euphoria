import { useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import constants from '../utils/constants'
import { beginBackendWakeCheck, markBackendAwake } from './useServerWakeState'

const RETRYABLE_METHODS = new Set(['GET'])
const MAX_NETWORK_RETRIES = 2
const RETRY_DELAY_MS = 1500

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const isNetworkError = (error) => error instanceof TypeError || error?.name === 'AbortError'

const parseResponse = async (response) => {
	const responseText = await response.text()

	if (!responseText) {
		return null
	}

	try {
		return JSON.parse(responseText)
	} catch (error) {
		return { message: responseText }
	}
}

const createHttpError = (response, data) => {
	const fallbackMessage = response.statusText || 'Request failed'
	const normalizedErrors = Array.isArray(data?.errors)
		? data.errors
		: [{ message: data?.message || data?.error || fallbackMessage }]

	const error = new Error(normalizedErrors[0]?.message || fallbackMessage)
	error.status = response.status
	error.errors = normalizedErrors

	return error
}

const wakeServer = async () => {
	try {
		const response = await fetch(constants.HEALTHCHECK_URL, {
			method: 'GET',
			cache: 'no-store',
		})

		if (response.ok) {
			markBackendAwake()
		}
	} catch (error) {
		// noop: the original request retry decides whether recovery succeeded.
	}
}

const useHttp = () => {
	const [processes, setProcesses] = useState({})
	const baseUrl = constants.API_URL
	const { token, isAuthenticated, user, logout } = useAuth()

	const request = useCallback(
		async (method, endpoint, body = null, addAuthorization = true, customHeaders = {}) => {
			const headers = { 'Content-Type': 'application/json', ...customHeaders }

			if (addAuthorization && isAuthenticated && token) {
				headers['Authorization'] = `Bearer ${token}`
			}
			if (!isAuthenticated && user?.id) {
				headers['x-guest-id'] = user.id
			}

			const options = {
				method,
				headers,
			}

			if (body) {
				options.body = body instanceof FormData ? body : JSON.stringify(body)
				if (body instanceof FormData) {
					delete headers['Content-Type']
				}
			}

			const cleanEndpoint = new URL(endpoint, baseUrl).pathname
			const endpointUrl = `${baseUrl}${endpoint}`

			try {
				setProcesses((prev) => ({ ...prev, [cleanEndpoint]: 'loading' }))
				beginBackendWakeCheck()

				for (let attempt = 0; attempt <= MAX_NETWORK_RETRIES; attempt++) {
					try {
						const response = await fetch(endpointUrl, options)
						const data = await parseResponse(response)
						markBackendAwake()

						if (response.status === 401 && addAuthorization && token) {
							logout()
						}

						if (!response.ok) {
							throw createHttpError(response, data)
						}

						setProcesses((prev) => ({ ...prev, [cleanEndpoint]: 'confirmed' }))

						return data
					} catch (error) {
						const shouldRetry =
							RETRYABLE_METHODS.has(method) &&
							attempt < MAX_NETWORK_RETRIES &&
							isNetworkError(error)

						if (!shouldRetry) {
							throw error
						}

						await wakeServer()
						await wait(RETRY_DELAY_MS * (attempt + 1))
					}
				}
			} catch (error) {
				setProcesses((prev) => ({ ...prev, [cleanEndpoint]: 'error' }))
				console.error('HTTP Error:', error)
				throw error.errors || error
			}
		},
		[baseUrl, isAuthenticated, logout, token, user]
	)

	const get = (endpoint, addAuthorization = true, headers = {}) =>
		request('GET', endpoint, null, addAuthorization, headers)
	const post = (endpoint, body, addAuthorization = true, headers = {}) =>
		request('POST', endpoint, body, addAuthorization, headers)
	const put = (endpoint, body, addAuthorization = true, headers = {}) =>
		request('PUT', endpoint, body, addAuthorization, headers)
	const del = (endpoint, id, addAuthorization = true, headers = {}) =>
		request('DELETE', endpoint, { id }, addAuthorization, headers)

	const clearError = (endpoint) =>
		setProcesses((prev) => ({ ...prev, [new URL(endpoint, baseUrl).pathname]: 'waiting' }))

	return { get, post, put, del, processes, clearError }
}

export default useHttp
