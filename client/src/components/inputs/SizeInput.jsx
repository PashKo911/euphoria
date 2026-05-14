import useFilterChange from '../../hooks/useFilterChange'
import styles from './sizeInput.module.scss'

const SizeInput = ({
	label,
	_id,
	type = 'checkbox',
	index,
	required = false,
	handleChange = null,
	filterType,
}) => {
	const { handleChange: hookHandleChange, state } = filterType
		? useFilterChange(filterType, _id)
		: { handleChange: null, state: {} }

	const onChangeHandler = handleChange || hookHandleChange

	const isChecked = (filterType && state[filterType]?.includes(_id)) || index === 0

	return (
		<label className={styles.label}>
			<input
				type={type}
				name="size"
				value={_id}
				className={styles.input}
				required={required}
				onChange={onChangeHandler}
				{...(onChangeHandler ? { checked: isChecked } : { defaultChecked: isChecked })}
			/>
			{label}
		</label>
	)
}

export default SizeInput
