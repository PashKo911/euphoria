import React from 'react'
import Accordion from '../accordion/Accordion'
import { useFilter } from '../../context/FilterProvider'
import styles from './filter.module.scss'
import { filterConfig } from '../../data/data'
import { GiSettingsKnobs } from 'react-icons/gi'
import { RiCloseLargeFill } from 'react-icons/ri'

const Filter = ({ options, isFilterOpen, callback }) => {
	const { state, dispatch } = useFilter()

	if (!options || Object.keys(options).length === 0) return null

	const handleChange = (name, value) => {
		dispatch({ type: `SET_${name.toUpperCase()}`, payload: value })
	}

	return (
		<aside className={`${styles.filter} ${isFilterOpen ? styles.open : ''}`}>
			<div className={styles.header}>
				<h4 className={styles.filterTitle}>Filter</h4>

				{isFilterOpen ? (
					<button type="button" className={styles.filterButton} onClick={() => callback(!isFilterOpen)}>
						<RiCloseLargeFill size={20} />
					</button>
				) : (
					<GiSettingsKnobs />
				)}
			</div>
			<form className={styles.filterBody}>
				{filterConfig.map(({ title, key, colCount }) => {
					const filterItems =
						key === 'price'
							? { minPrice: options.priceRange.minPrice, maxPrice: options.priceRange.maxPrice }
							: options[key]

					return (
						<Accordion
							key={key}
							title={title}
							items={filterItems}
							colCount={colCount}
							filterType={key}
							onChange={(value) => handleChange(key, value)}
						/>
					)
				})}
			</form>
		</aside>
	)
}

export default Filter
