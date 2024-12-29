import styles from './buttonPurple.module.scss'
import { FaSpinner } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ButtonPurple = ({ onClick, title, style, isLoading, to, icon = false }) => {
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
			<Link to={to} className={styles.button} style={style}>
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

export default ButtonPurple
