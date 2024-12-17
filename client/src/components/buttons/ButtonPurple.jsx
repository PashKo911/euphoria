import styles from './buttonPurple.module.scss'
import { FaSpinner } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ButtonPurple = ({ onClick, title, style, isLoading, disabled, to }) => {
	if (to) {
		return (
			<Link to={to} className={styles.button} style={style}>
				{isLoading === 'loading' ? <FaSpinner className={styles.spinner} /> : title}
			</Link>
		)
	}

	return (
		<button className={styles.button} type="submit" onClick={onClick} style={style} disabled={disabled}>
			{isLoading === 'loading' ? <FaSpinner className={styles.spinner} /> : title}
		</button>
	)
}

export default ButtonPurple
