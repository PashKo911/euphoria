import { Link } from 'react-router-dom'
import styles from './product.module.scss'
import { GrFavorite } from 'react-icons/gr'
import constants from '../../utils/constants'

const Product = ({ path, title, price }) => {
	return (
		<article className={styles.product}>
			<button type="button" className={styles.favorite}>
				<GrFavorite />
			</button>
			<Link to={'/products/id'} className={styles.link}>
				<img src={`${constants.API_BASE}${path}`} alt={title} />
			</Link>
			<div className={styles.body}>
				<Link to={'/products/id'} className={styles.linkTitle}>
					<h4 className={styles.title}>{title}</h4>
				</Link>

				<div className={styles.label}>Explore Now!</div>
				<div className={styles.price}>${price}</div>
			</div>
		</article>
	)
}

export default Product
