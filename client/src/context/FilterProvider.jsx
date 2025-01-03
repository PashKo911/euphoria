import React, { createContext, useContext, useReducer, useEffect } from 'react'

const FilterContext = createContext()

const initialState = JSON.parse(localStorage.getItem('filters')) || {
	page: 0,
	perPage: 9,
	title: '',
	category: '',
	price: [],
	colors: [],
	sizes: [],
	styles: [],
	sort: '',
}
function filterReducer(state, action) {
	switch (action.type) {
		case 'SET_SEARCH':
			return { ...state, title: action.payload }
		case 'SET_PAGE':
			return { ...state, page: action.payload }
		case 'SET_GENDER':
			return { ...state, gender: action.payload }
		case 'SET_PRICE':
			return { ...state, price: action.payload }
		case 'SET_COLORS':
			return { ...state, colors: action.payload }
		case 'SET_STYLES':
			return { ...state, styles: action.payload }
		case 'SET_SIZES':
			return { ...state, sizes: action.payload }
		case 'SET_SORT':
			return { ...state, sort: action.payload }
		case 'CLEAR_FILTER':
			return { ...state, [action.payload.key]: Array.isArray(state[action.payload.key]) ? [] : '' }
		case 'CLEAR_ALL_FILTERS':
			return {
				page: state.page,
				perPage: state.perPage,
				gender: state.gender,
				title: '',
				price: [],
				colors: [],
				sizes: [],
				styles: [],
				sort: '',
			}
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
