import { useFilter } from '../../context/FilterProvider'
import { GiSettingsKnobs } from 'react-icons/gi'
import styles from './filterSort.module.scss'
import Select from '../slelects/Select'
import { useEffect, useState } from 'react'

const FilterSort = ({ isFilterOpen, callback, styles: customStyles }) => {
	const { state, dispatch } = useFilter()
	const [resetValues, setResetValues] = useState()

	const options = [
		{ value: 'price:asc', label: 'Price: Lowest first' },
		{ value: 'price:desc', label: 'Price: Highest first' },
		{ value: 'createdAt:desc', label: 'Newest' },
	]

	const handleChange = (value) => {
		dispatch({ type: 'SET_SORT', payload: value.value })
	}

	useEffect(() => {
		setResetValues(true)
		setTimeout(() => setResetValues(false), 0)
	}, [state])

	return (
		<div className={styles.wrapper} style={customStyles}>
			<button type="button" className={styles.button} onClick={() => callback(!isFilterOpen)}>
				Filters
				<GiSettingsKnobs />
			</button>
			<Select
				options={options}
				placeholder="Sort by:"
				resetValues={resetValues}
				value={options.find((option) => option.value === state.sort)}
				onChange={handleChange}
			/>
		</div>
	)
}

export default FilterSort
