import styles from './infoInput.module.scss'

const InfoInput = ({
	id,
	label,
	type,
	name,
	required = false,
	placeholder = '',
	value = '',
	onChange = () => {},
}) => {
	return (
		<div className={styles.wrapper}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			<input
				className={styles.input}
				id={id}
				type={type}
				name={name}
				required={required}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</div>
	)
}

export default InfoInput
