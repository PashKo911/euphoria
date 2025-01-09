import ButtonPurple from '../../components/buttons/ButtonPurple'
import styles from './notFound.module.scss'

const NotFound = () => {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<div className={styles.img}>
					<img src="/assets/img/notFound/notFound.png" alt="Not Found" />
				</div>
				<h1 className={styles.title}>Oops! Page not found</h1>
				<div className={styles.subtitle}>
					The page you are looking for might have been removed or temporarily unavailable.
				</div>
				<ButtonPurple title={'Back to HomePage'} to={'/home'} />
			</div>
		</section>
	)
}

export default NotFound
