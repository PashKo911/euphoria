import { RiCloseLargeFill } from 'react-icons/ri'

import styles from './clearFilterButton.module.scss'

const ClearFilterButton = ({ type, onClick }) => {
	return (
		<button type="button" className={styles.button} onClick={onClick}>
			{type}
			<span>
				<RiCloseLargeFill size={14} />
			</span>
		</button>
	)
}

export default ClearFilterButton
