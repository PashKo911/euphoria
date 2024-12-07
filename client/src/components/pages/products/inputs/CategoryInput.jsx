import { IoIosArrowUp } from 'react-icons/io'

import styles from './categoryInput.module.scss'

const CategoryInput = ({ title }) => {
	return (
		<label className={styles.label}>
			<input type="checkbox" name="style" className={styles.input} />
			{title}
			<IoIosArrowUp size={'1.35em'} />
		</label>
	)
}

export default CategoryInput
