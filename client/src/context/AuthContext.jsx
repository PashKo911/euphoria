import { createContext, useState, useContext, useEffect, useRef, useCallback } from 'react'
import constants from '../utils/constants'
import { useCart } from './CartContext'
import { beginBackendWakeCheck, markBackendAwake } from '../hooks/useServerWakeState'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [token, setToken] = useState(null)
	const [user, setUser] = useState(null)

	const { syncCart } = useCart()
	const logoutTimerRef = useRef(null)

	const fetchGuest = useCallback(async (guestId) => {
		try {
			beginBackendWakeCheck()

			const finalGuestId = guestId ?? localStorage.getItem('guest_id')

			const headers = {
				'Content-Type': 'application/json',
			}

			if (finalGuestId) {
				headers['x-guest-id'] = finalGuestId
			}

			const response = await fetch(`${constants.API_URL}/auth/set-guest`, {
				method: 'POST',
				headers,
			})

			if (response.status === 404) {
				localStorage.removeItem('guest_id')
				return null
			}

			if (!response.ok) {
				throw new Error('Failed to fetch guest')
			}

			const guestData = await response.json()

			markBackendAwake()

			const nextGuestUser = {
				...guestData,
				id: guestData.id,
			}

			localStorage.setItem('guest_id', guestData.id)
			localStorage.setItem('user_data', JSON.stringify(nextGuestUser))

			setUser(nextGuestUser)

			syncCart?.(guestData.cart || [])

			return nextGuestUser
		} catch (error) {
			console.error('Error fetching guest:', error)
			return null
		}
	}, [])

	const logout = useCallback(() => {
		localStorage.removeItem('jwt_token')
		localStorage.removeItem('user_data')
		localStorage.removeItem('expire_time')

		setToken(null)
		setIsAuthenticated(false)
		setUser(null)

		fetchGuest().catch(() => {})
	}, [fetchGuest])

	useEffect(() => {
		const storedToken = localStorage.getItem('jwt_token')
		const storedUser = JSON.parse(localStorage.getItem('user_data') || 'null')
		const storedGuestId = localStorage.getItem('guest_id')
		const storedExpireTime = parseInt(localStorage.getItem('expire_time'), 10)

		const init = async () => {
			if (storedToken && storedUser && storedExpireTime > Date.now()) {
				setToken(storedToken)
				setUser(storedUser.id ? storedUser : { ...storedUser, id: storedGuestId || null })
				setIsAuthenticated(true)
				return
			}

			localStorage.removeItem('jwt_token')
			localStorage.removeItem('expire_time')

			if (storedGuestId || storedUser) {
				const nextGuestUser = storedUser?.id
					? storedUser
					: {
							...storedUser,
							id: storedGuestId,
					  }

				setUser(nextGuestUser)

				await fetchGuest(storedGuestId)
			} else {
				await fetchGuest()
			}
		}

		init()
	}, [fetchGuest])

	useEffect(() => {
		if (isAuthenticated && token) {
			const storedExpireTime = parseInt(localStorage.getItem('expire_time'), 10)

			const timeLeft = storedExpireTime - Date.now()

			if (timeLeft > 0) {
				logoutTimerRef.current = setTimeout(() => {
					logout()
				}, timeLeft)
			} else {
				logout()
			}
		}

		return () => {
			if (logoutTimerRef.current) {
				clearTimeout(logoutTimerRef.current)
				logoutTimerRef.current = null
			}
		}
	}, [isAuthenticated, token, logout])

	const login = (data) => {
		localStorage.removeItem('guest_id')

		localStorage.setItem('jwt_token', data.token)
		localStorage.setItem('user_data', JSON.stringify(data.user))

		const expireTime = Date.now() + data.expireInMs
		localStorage.setItem('expire_time', expireTime)

		setToken(data.token)
		setUser(data.user)
		setIsAuthenticated(true)

		syncCart(data.cart || [])
	}

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				token,
				user,
				login,
				logout,
				fetchGuest,
			}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
