import styles from './sizeInput.module.scss'

const SizeInput = ({ title, type = 'checkbox' }) => {
	return (
		<label className={styles.label}>
			<input type={type} name="size" className={styles.input} />
			{title}
		</label>
	)
}

export default SizeInput
