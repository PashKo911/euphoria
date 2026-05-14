import React from 'react'
import styles from './textarea.module.scss'

const Textarea = ({ id, label, value, onChange, placeholder, required = false }) => {
	return (
		<div className={styles.textareaWrapper}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			<textarea
				className={styles.textarea}
				id={id}
				name={id}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
			/>
		</div>
	)
}

export default Textarea
