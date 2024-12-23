import { Link } from 'react-router-dom'
import styles from './product.module.scss'
import { GrFavorite } from 'react-icons/gr'
import constants from '../../utils/constants'

const Product = ({ path, title, price }) => {
	return (
		<article className={styles.product}>
			<Link to={'/products/id'} className={styles.link}>
				<button type="button" className={styles.favorite}>
					<GrFavorite />
				</button>
				<div className={styles.img}>
					<img src={`${constants.API_BASE}${path}`} alt={title} />
				</div>
				<div className={styles.body}>
					<h4 className={styles.title}>{title}</h4>

					<div className={styles.label}>Explore Now!</div>
					<div className={styles.price}>${price}</div>
				</div>
			</Link>
		</article>
	)
}

export default Product
