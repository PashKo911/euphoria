import { useState } from 'react'
import { useFilter } from '../../context/FilterProvider'
import { GiSettingsKnobs } from 'react-icons/gi'
import styles from './filterSort.module.scss'
import Select from '../slelects/Select'

const FilterSort = ({ isFilterOpen, callback }) => {
	const { state, dispatch } = useFilter()

	const options = [
		{ value: 'asc', label: 'Price: Lowest first' },
		{ value: 'desc', label: 'Price: Highest first' },
		{ value: 'newest', label: 'Newest' },
	]
	const handleChange = (value) => {
		dispatch({ type: 'SET_SORT', payload: value })
	}

	return (
		<div className={styles.wrapper}>
			<button type="button" className={styles.button} onClick={() => callback(!isFilterOpen)}>
				Filters
				<GiSettingsKnobs />
			</button>
			<Select
				options={options}
				placeholder="Sort by:"
				value={options.find((option) => option.value === state.sort)}
				onChange={handleChange}
			/>
		</div>
	)
}

export default FilterSort
