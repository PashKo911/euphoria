import { useState } from 'react'

import { GiSettingsKnobs } from 'react-icons/gi'
import styles from './filterSort.module.scss'
import Select from '../slelects/Select'

const FilterSort = ({ isFilterOpen, callback }) => {
	const options = [
		{ value: 'price-asc', label: 'Price: Lowest first' },
		{ value: 'price-desc', label: 'Price: Highest first' },
		{ value: 'newest', label: 'Newest' },
	]

	const [selected, setSelected] = useState(null)

	return (
		<div className={styles.wrapper}>
			<button type="button" className={styles.button} onClick={() => callback(!isFilterOpen)}>
				Filters
				<GiSettingsKnobs />
			</button>
			<Select options={options} placeholder="Sort by:" onChange={(option) => setSelected(option)} />
		</div>
	)
}

export default FilterSort
