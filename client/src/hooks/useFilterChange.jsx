import { useFilter } from '../context/FilterProvider'

const useFilterChange = (filterType, _id) => {
	const { state, dispatch } = useFilter()

	const handleChange = () => {
		const newValue = state[filterType].includes(_id)
			? state[filterType].filter((elId) => elId !== _id)
			: [...state[filterType], _id]

		dispatch({ type: `SET_${filterType.toUpperCase()}`, payload: newValue })
		dispatch({ type: 'SET_PAGE', payload: 0 })
	}

	return { handleChange, state }
}

export default useFilterChange
