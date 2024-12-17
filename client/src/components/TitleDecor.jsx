import styles from './titleDecor.module.scss'

const TitleDecor = ({ title }) => {
	return <h2 className={styles.title}>{title}</h2>
}

export default TitleDecor
