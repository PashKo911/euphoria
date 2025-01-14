import { FaSpinner } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import styles from './button.module.scss'

const Button = ({ onClick, title, style, isLoading, to, icon = false, variant = 'purple' }) => {
	const renderContent = () => (
		<>
			{isLoading === 'loading' ? (
				<FaSpinner className={styles.spinner} />
			) : (
				<>
					{icon}
					{title}
				</>
			)}
		</>
	)

	if (to) {
		return (
			<Link
				to={to}
				className={`${styles.button} ${variant === 'white' ? styles.buttonWhite : ''}`}
				style={style}>
				{renderContent()}
			</Link>
		)
	}

	return (
		<button
			className={styles.button}
			type="submit"
			onClick={onClick}
			style={style}
			disabled={isLoading === 'loading'}>
			{renderContent()}
		</button>
	)
}

export default Button
