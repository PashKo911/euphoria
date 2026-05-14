import { useState } from 'react'

export const useErrorMessage = () => {
	const [errorMessage, setErrorMessage] = useState([])

	const addError = (error) => {
		if (Array.isArray(error)) {
			setErrorMessage(error)
		} else {
			setErrorMessage([error])
		}
	}

	const clearError = () => {
		setErrorMessage([])
	}

	return { errorMessage, addError, clearError }
}
