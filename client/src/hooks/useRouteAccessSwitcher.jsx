import { useMemo } from 'react'
import { useAuth } from '../context/AuthContext'

/**
 * Custom hook to check route access based on user type.
 *
 * @param {Array<string>} allowedTypes - Array of allowed user types for the route.
 * @returns {boolean | null} - `true` if access is allowed, `false` if not, `null` if inputs are invalid.
 */
const useRouteAccessSwitcher = (allowedTypes) => {
	const { user } = useAuth()
	const type = user?.type?.name

	const hasAccess = useMemo(() => {
		if (!type || !Array.isArray(allowedTypes)) {
			return null
		}
		return allowedTypes.includes(type)
	}, [type, allowedTypes])

	return hasAccess
}

export default useRouteAccessSwitcher
