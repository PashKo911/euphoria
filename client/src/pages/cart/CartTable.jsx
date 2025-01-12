import CartProduct from '../../components/productCards/CartProduct'
import Preloader from '../../components/process/Preloader'

import styles from './cartTable.module.scss'

const CartTable = ({ products, amountHandler, deleteHandler, processes }) => {
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
				{processes['/cart'] === 'loading' && !processes['/cart/amount'] ? (
					<Preloader className={styles.preloader} />
				) : (
					products?.map((product) => (
						<CartProduct
							key={product.details._id}
							amountHandler={amountHandler}
							deleteHandler={deleteHandler}
							product={product}
							processes={processes}
						/>
					))
				)}
			</div>
		</>
	)
}

export default CartTable
