import React from 'react'
import styles from './colorsInput.module.scss'
import useFilterChange from '../../hooks/useFilterChange'

const ColorsInput = ({ label, value, _id, filterType }) => {
	const { handleChange, state } = useFilterChange(filterType, _id)

	return (
		<label className={styles.label}>
			<span style={{ backgroundColor: `${value}` }}></span>
			<input
				type="checkbox"
				name="color"
				value={_id}
				className={styles.input}
				onChange={handleChange}
				checked={state[filterType].includes(_id)}
			/>
			{label}
		</label>
	)
}

export default ColorsInput
