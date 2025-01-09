import { useState } from 'react'
import styles from './colorsInputRound.module.scss'

const ColorsInputRound = ({ props, required }) => {
	const { _id, value } = props
	const [selectedColor, setSelectedColor] = useState(_id)
	const handleChange = (event) => {
		setSelectedColor(event.target.value)
	}

	return (
		<label style={{ backgroundColor: `${value}` }} className={styles.item}>
			<input
				type="radio"
				className={styles.input}
				required={required}
				name="color"
				value={_id}
				checked={selectedColor === _id}
				onChange={handleChange}
			/>
			<span style={{ borderColor: `${value}` }}></span>
		</label>
	)
}

export default ColorsInputRound
