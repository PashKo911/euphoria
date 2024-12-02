import styles from './sizeInput.module.scss'

const SizeInput = ({ title }) => {
	return (
		<label className={styles.label}>
			<input type="checkbox" name="size" className={styles.input} />
			{title}
		</label>
	)
}

export default SizeInput
