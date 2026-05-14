import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useFilter } from '../context/FilterProvider'

export const useSyncFiltersWithURL = () => {
	const { state, dispatch } = useFilter()
	const [searchParams, setSearchParams] = useSearchParams()

	useEffect(() => {
		const filtersFromURL = Object.fromEntries(searchParams.entries())

		Object.entries(filtersFromURL).forEach(([key, value]) => {
			let parsedValue

			if (value.includes(',')) {
				parsedValue = value.split(',').map((item) => (isNaN(item) ? item : Number(item)))
			} else {
				parsedValue = isNaN(value) ? value : Number(value)
			}

			const finalValue = Array.isArray(state[key])
				? Array.isArray(parsedValue)
					? parsedValue
					: [parsedValue]
				: parsedValue

			if (finalValue !== state[key]) {
				dispatch({ type: `SET_${key.toUpperCase()}`, payload: finalValue })
			}
		})
	}, [searchParams])

	useEffect(() => {
		const params = new URLSearchParams()

		Object.entries(state).forEach(([key, value]) => {
			if (value && (Array.isArray(value) ? value.length > 0 : true)) {
				params.set(key, Array.isArray(value) ? value.join(',') : value)
			}
		})

		if (params.toString() === '') {
			setSearchParams({})
		} else {
			setSearchParams(params)
		}
	}, [state])
}
