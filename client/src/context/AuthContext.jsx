import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [token, setToken] = useState(null)
	const [user, setUser] = useState(null)

	useEffect(() => {
		const storedToken = localStorage.getItem('jwt_token')
		const storedUser = JSON.parse(localStorage.getItem('user_data'))
		if (storedToken && storedUser) {
			setToken(storedToken)
			setUser(storedUser)
			setIsAuthenticated(true)
		}
	}, [])

	const login = (newToken, userData) => {
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

	return (
		<AuthContext.Provider value={{ isAuthenticated, token, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
