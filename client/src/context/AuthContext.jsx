import React, { createContext, useState, useContext, useEffect } from 'react'
import constants from '../utils/constants'
import { useCart } from './CartContext'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [token, setToken] = useState(null)
	const [user, setUser] = useState(null)
	const { syncCart } = useCart()

	useEffect(() => {
		const storedToken = localStorage.getItem('jwt_token')
		const storedUser = JSON.parse(localStorage.getItem('user_data'))
		const storedGuestId = localStorage.getItem('guest_id')

		if (storedToken && storedUser) {
			setToken(storedToken)
			setUser(storedUser)
			setIsAuthenticated(true)
		} else if (storedGuestId && storedUser) {
			setUser(storedUser)
		} else {
			fetchGuest()
		}
	}, [])

	const login = (data) => {
		localStorage.removeItem('guest_id')
		localStorage.setItem('jwt_token', data.token)
		localStorage.setItem('user_data', JSON.stringify(data.user))
		setToken(data.token)
		setUser(data.user)
		setIsAuthenticated(true)
		syncCart(data.cart || [])
	}

	const logout = () => {
		localStorage.removeItem('jwt_token')
		localStorage.removeItem('user_data')
		setToken(null)
		setUser(null)
		setIsAuthenticated(false)
		fetchGuest()
	}

	const fetchGuest = async () => {
		try {
			const response = await fetch(`${constants.API_URL}/auth/set-guest`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
			})

			if (!response.ok) {
				throw new Error('Failed to fetch guest')
			}

			const guestData = await response.json()
			localStorage.setItem('guest_id', guestData.id)
			setUser(guestData)
			localStorage.setItem('user_data', JSON.stringify(guestData))
			syncCart(guestData.cart || [])
			return guestData
		} catch (error) {
			console.error('Error fetching guest:', error)
			throw error
		}
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
