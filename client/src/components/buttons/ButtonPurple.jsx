import styles from './buttonPurple.module.scss'
import { FaSpinner } from 'react-icons/fa'

const ButtonPurple = ({ onClick, title, style, isLoading, disabled }) => {
	return (
		<button className={styles.button} type="submit" onClick={onClick} style={style} disabled={disabled}>
			{isLoading ? <FaSpinner className={styles.spinner} /> : title}
		</button>
	)
}

export default ButtonPurple
