import { IoIosArrowUp } from 'react-icons/io'
import useFilterChange from '../../hooks/useFilterChange'

import styles from './categoryInput.module.scss'

const CategoryInput = ({ label, _id, filterType }) => {
	const { handleChange, state } = useFilterChange(filterType, _id)

	return (
		<label className={styles.label}>
			<input
				type="checkbox"
				name="styles"
				value={_id}
				className={styles.input}
				onChange={handleChange}
				checked={state[filterType].includes(_id)}
			/>
			{label}
			<IoIosArrowUp size={'1.35em'} />
		</label>
	)
}

export default CategoryInput
