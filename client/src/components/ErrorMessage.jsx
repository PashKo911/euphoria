import React from 'react'

const ErrorMessage = ({ errors }) => {
	if (!errors || errors.length === 0) return null

	return (
		<div className="error-block">
			{errors.map((error, index) => (
				<p key={index}>{error.message || error}</p>
			))}
		</div>
	)
}

export default ErrorMessage
