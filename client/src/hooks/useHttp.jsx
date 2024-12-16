import { useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import constants from '../utils/constants'

const useHttp = () => {
	const [process, setProcess] = useState('')
	const baseUrl = constants.API_URL
	const { token, isAuthenticated } = useAuth()

	const request = useCallback(
		async (method, endpoint, body = null, addAuthorization = true, customHeaders = {}) => {
			const headers = { 'Content-Type': 'application/json', ...customHeaders }

			if (addAuthorization && isAuthenticated && token) {
				headers['Authorization'] = `Bearer ${token}`
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

			try {
				setProcess('loading')
				const endpointUrl = `${baseUrl}${endpoint}`
				const response = await fetch(endpointUrl, options)

				if (!response.ok) {
					const data = await response.json()
					throw data.errors
				}

				const data = await response.json()

				setProcess('confirmed')
				return data
			} catch (error) {
				setProcess('error')
				console.error('HTTP Error:', error.message)
				throw error
			}
		},
		[baseUrl, isAuthenticated, token]
	)

	const get = (endpoint, addAuthorization = true, headers = {}) =>
		request('GET', endpoint, null, addAuthorization, headers)
	const post = (endpoint, body, addAuthorization = true, headers = {}) =>
		request('POST', endpoint, body, addAuthorization, headers)
	const put = (endpoint, body, addAuthorization = true, headers = {}) =>
		request('PUT', endpoint, body, addAuthorization, headers)
	const del = (endpoint, body, addAuthorization = true, headers = {}) =>
		request('DELETE', endpoint, body, addAuthorization, headers)

	const clearError = () => setProcess('waiting')

	return { get, post, put, del, process, clearError }
}

export default useHttp
