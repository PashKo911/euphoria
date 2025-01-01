import { useState } from 'react'
import { useFilter } from '../../context/FilterProvider'
import { HiOutlineSearch } from 'react-icons/hi'

import styles from './searchForm.module.scss'

const SearchForm = () => {
	const { state, dispatch } = useFilter()
	const [search, setSearch] = useState(state.search)
	const submitHandle = (e) => {
		console.log(e)
		e.preventDefault()
		dispatch({ type: 'SET_SEARCH', payload: search })
	}

	return (
		<form onSubmit={(e) => submitHandle(e)} className={styles.form}>
			<input
				className={styles.input}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search"
				type="text"
			/>
			<button className={styles.button} aria-label="Search Form">
				<HiOutlineSearch />
			</button>
		</form>
	)
}

export default SearchForm
