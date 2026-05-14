import styles from './titleDecor.module.scss'

const TitleDecor = ({ title, style }) => {
	return (
		<h2 className={styles.title} style={style}>
			{title}
		</h2>
	)
}

export default TitleDecor
