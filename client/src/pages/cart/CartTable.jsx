import Counter from '../../components/counters/Counter'
import { RiDeleteBinLine } from 'react-icons/ri'
import styles from './cartTable.module.scss'
import { Link } from 'react-router-dom'

const CartTable = () => {
	// !!
	let _id = null
	return (
		<>
			<div className={styles.header}>
				<div className={styles.cell}>Product Details</div>
				<div className={styles.cell}>Price</div>
				<div className={styles.cell}>Quantity</div>
				<div className={styles.cell}>action</div>
				<h1 className={styles.titleMain}>Cart</h1>
			</div>
			<div className={styles.body}>
				<article className={styles.item}>
					<div className={styles.details}>
						<Link to={`/home/products/detail/${_id}`} className={styles.img}>
							<img src="/assets/img/auth/signIn.png" alt="image" />
						</Link>
						<div className={styles.infoWrapper}>
							<Link to={`/home/products/detail/${_id}`} className={styles.title}>
								Blue Flower Print Crop Top
							</Link>
							<h3 className={styles.param}>Color : Yellow</h3>
							<h3 className={styles.param}>Size : M</h3>
						</div>
					</div>
					<div className={styles.price}>$1129.00</div>
					<div className={styles.quantity}>
						<Counter />
					</div>
					<button type="button" className={styles.action}>
						<RiDeleteBinLine />
					</button>
				</article>
				<article className={styles.item}>
					<div className={styles.details}>
						<div className={styles.img}>
							<img src="/assets/img/auth/signIn.png" alt="image" />
						</div>
						<div className={styles.infoWrapper}>
							<h2 className={styles.title}>Blue Flower Print Crop Top</h2>
							<h3 className={styles.param}>Color : Yellow</h3>
							<h3 className={styles.param}>Size : M</h3>
						</div>
					</div>
					<div className={styles.price}>$29.00</div>
					<div className={styles.quantity}>
						<Counter />
					</div>
					<div className={styles.action}>
						<RiDeleteBinLine />
					</div>
				</article>
			</div>
		</>
	)
}

export default CartTable
