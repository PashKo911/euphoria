import React from 'react'
import styles from './colorsInput.module.scss'

const ColorsInput = ({ title, color }) => {
	return (
		<label className={styles.label}>
			<span style={{ backgroundColor: color }}></span>
			<input type="checkbox" name="color" className={styles.input} />
			{title}
		</label>
	)
}

export default ColorsInput
