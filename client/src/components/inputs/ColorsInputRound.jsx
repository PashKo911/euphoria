// colorsInputRound.jsx
import styles from './colorsInputRound.module.scss'

const ColorsInputRound = ({ props, required, index }) => {
	const { _id, value } = props

	return (
		<label style={{ backgroundColor: `${value}` }} className={styles.item}>
			<input
				type="radio"
				className={styles.input}
				required={required}
				name="color"
				value={_id}
				checked={index === 0}
				onChange={() => {}}
			/>
			<span style={{ borderColor: `${value}` }}></span>
		</label>
	)
}

export default ColorsInputRound
