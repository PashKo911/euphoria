import Counter from '../../components/counters/Counter'
import { RiDeleteBinLine } from 'react-icons/ri'
import constants from '../../utils/constants'
import { Link } from 'react-router-dom'

import styles from './cartProduct.module.scss'

const CartProduct = ({ product, amountHandler, deleteHandler, processes }) => {
	const { amount, details, totalProductsPrice, size, color } = product
	return (
		<article className={styles.item}>
			<div className={styles.details}>
				<Link to={`/products/detail/${details._id}`} className={styles.img}>
					<img src={`${constants.API_BASE}${details.paths[0]}`} alt={details.title} />
				</Link>
				<div className={styles.infoWrapper}>
					<Link to={`/products/detail/${details._id}`} className={styles.title}>
						{details.title}
					</Link>
					<h3 className={styles.param}>
						Color : <span style={{ textTransform: 'capitalize' }}>{color.label}</span>{' '}
					</h3>
					<h3 className={styles.param}>
						Size : <span style={{ textTransform: 'uppercase' }}>{size.label}</span>
					</h3>
				</div>
			</div>
			<div className={styles.price}>${totalProductsPrice.toFixed(2)}</div>
			<div className={styles.quantity}>
				<Counter
					initialValue={amount}
					max={details.count}
					amountHandler={amountHandler}
					productId={details._id}
					processes={processes}
				/>
			</div>
			<button type="button" onClick={() => deleteHandler(details._id)} className={styles.action}>
				<RiDeleteBinLine />
			</button>
		</article>
	)
}

export default CartProduct
