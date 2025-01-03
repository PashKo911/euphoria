import React from 'react'
import styles from './clearFilterBlock.module.scss'
import ClearFilterButton from '../buttons/ClearFilterButton'

const ClearFilterBlock = ({ state, filterOptions, dispatch }) => {
	const ignoredFields = ['gender', 'page', 'perPage']

	const activeFilters = Object.entries(state).filter(
		([key, value]) => !ignoredFields.includes(key) && value && (Array.isArray(value) ? value.length : true)
	)

	const clearFilter = (key) => {
		dispatch({ type: 'CLEAR_FILTER', payload: { key } })
	}
	const clearAll = () => {
		dispatch({ type: 'CLEAR_ALL_FILTERS' })
	}

	if (!activeFilters.length) return null

	return (
		<div className={styles.clearBlock}>
			<ClearFilterButton type={'Clear All'} onClick={clearAll} />
			<div className={styles.items}>
				{activeFilters.map(([key, value]) => (
					<ClearFilterButton
						key={key}
						type={filterOptions[key]?.find((option) => option._id === value)?.label || key}
						onClick={() => clearFilter(key)}
					/>
				))}
			</div>
		</div>
	)
}

export default ClearFilterBlock
