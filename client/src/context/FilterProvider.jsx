import React, { createContext, useContext, useReducer, useEffect } from 'react'

const FilterContext = createContext()

const initialState = JSON.parse(localStorage.getItem('filters')) || {
	search: '',
	category: '',
	priceRange: [],
	colors: [],
	sizes: [],
	styles: [],
	sort: '',
}
function filterReducer(state, action) {
	switch (action.type) {
		case 'SET_SEARCH':
			return { ...state, search: action.payload }
		case 'SET_CATEGORY':
			return { ...state, category: action.payload }
		case 'SET_PRICE':
			return { ...state, priceRange: action.payload }
		case 'SET_COLORS':
			return { ...state, colors: action.payload }
		case 'SET_STYLES':
			return { ...state, styles: action.payload }
		case 'SET_SIZES':
			return { ...state, sizes: action.payload }
		case 'SET_SORT':
			return { ...state, sort: action.payload }
		default:
			return state
	}
}

export const FilterProvider = ({ children }) => {
	const [state, dispatch] = useReducer(filterReducer, initialState)

	useEffect(() => {
		localStorage.setItem('filters', JSON.stringify(state))
	}, [state])

	return <FilterContext.Provider value={{ state, dispatch }}>{children}</FilterContext.Provider>
}

export const useFilter = () => useContext(FilterContext)
