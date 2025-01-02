import styles from './colorsInputRound.module.scss'

const ColorsInputRound = ({ props }) => {
	const { _id, value } = props
	return (
		<label style={{ backgroundColor: `${value}` }} className={styles.item}>
			<input type="radio" className={styles.input} name="color" value={_id} />
			<span style={{ borderColor: `${value}` }}></span>
		</label>
	)
}

export default ColorsInputRound
