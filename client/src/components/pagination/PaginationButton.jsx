// components/PaginationButton.jsx
import styles from './pagination.module.scss'

const PaginationButton = ({ isActive, disabled, onClick, children }) => {
	return (
		<button
			className={`${styles.button} ${isActive ? styles.active : ''} ${disabled ? styles.disabled : ''}`}
			onClick={onClick}
			disabled={disabled}>
			{children}
		</button>
	)
}

export default PaginationButton
