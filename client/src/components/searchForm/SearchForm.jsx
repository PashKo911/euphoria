import { useState } from 'react'
import { useFilter } from '../../context/FilterProvider'

import { HiOutlineSearch } from 'react-icons/hi'
import { RiCloseLargeFill } from 'react-icons/ri'

import styles from './searchForm.module.scss'

const SearchForm = () => {
	const { state, dispatch } = useFilter()
	const [search, setSearch] = useState(state.title)
	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch({ type: 'SET_SEARCH', payload: search })
	}
	const handleClear = () => {
		setSearch('')
		dispatch({ type: 'SET_SEARCH', payload: '' })
	}

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<input
				className={styles.input}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search"
				type="text"
			/>
			{state.search && (
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
