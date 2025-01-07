import React, { createContext, useState, useContext, useEffect } from 'react'
import constants from '../utils/constants'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [token, setToken] = useState(null)
	const [user, setUser] = useState(null)

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

	const login = (newToken, userData) => {
		localStorage.removeItem('guest_id')
		localStorage.setItem('jwt_token', newToken)
		localStorage.setItem('user_data', JSON.stringify(userData))
		setToken(newToken)
		setUser(userData)
		setIsAuthenticated(true)
	}

	const logout = () => {
		localStorage.removeItem('jwt_token')
		localStorage.removeItem('user_data')
		setToken(null)
		setUser(null)
		setIsAuthenticated(false)
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
