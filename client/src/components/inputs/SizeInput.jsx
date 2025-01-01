import useFilterChange from '../../hooks/useFilterChange'
import styles from './sizeInput.module.scss'

const SizeInput = ({ label, _id, onChange, type = 'checkbox', filterType }) => {
	const { handleChange, state } = useFilterChange(filterType, _id)
	return (
		<label className={styles.label} onClick={onChange}>
			<input
				type={type}
				name="size"
				value={_id}
				className={styles.input}
				onChange={handleChange}
				checked={state[filterType].includes(_id)}
			/>
			{label}
		</label>
	)
}

export default SizeInput
