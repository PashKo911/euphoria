import { useEffect, useState } from 'react'
import { useFilter } from '../../context/FilterProvider'
import { HiOutlineSearch } from 'react-icons/hi'
import { RiCloseLargeFill } from 'react-icons/ri'
import { useNavigate, useLocation } from 'react-router-dom'

import styles from './searchForm.module.scss'

const SearchForm = () => {
	const { state, dispatch } = useFilter()
	const [search, setSearch] = useState(state.title)
	const navigate = useNavigate()
	const location = useLocation()

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch({ type: 'SET_SEARCH', payload: search })

		if (location.pathname !== '/products') {
			navigate('/products')
		}
	}

	const handleClear = () => {
		setSearch('')
		dispatch({ type: 'SET_SEARCH', payload: '' })
	}

	useEffect(() => {
		setSearch(state.title)
	}, [state])

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<input
				className={styles.input}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search"
				type="text"
			/>
			{state.title && (
				<button type="button" aria-label="Clear field" className={styles.close} onClick={handleClear}>
					<RiCloseLargeFill size={18} />
				</button>
			)}

			<button className={styles.button} aria-label="Search Form">
				<HiOutlineSearch />
			</button>
		</form>
	)
}

export default SearchForm
