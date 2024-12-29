import styles from './colorsInputRound.module.scss'

const ColorsInputRound = ({ props }) => {
	const { name, _id } = props
	return (
		<label style={{ backgroundColor: `${name}` }} className={styles.item}>
			<input type="radio" className={styles.input} name="color" value={_id} />
			<span style={{ borderColor: `${name}` }}></span>
		</label>
	)
}

export default ColorsInputRound
