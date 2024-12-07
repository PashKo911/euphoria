import { Link } from 'react-router-dom'

import styles from './buttonPurple.module.scss'

const ButtonPurple = ({ path, title, style }) => {
	return (
		<Link className={styles.button} to={path} style={style}>
			{title}
		</Link>
	)
}

export default ButtonPurple
