import { Link } from 'react-router-dom'
import CartTable from './CartTable'

import styles from './cartWrapper.module.scss'
import ButtonPurple from '../../components/buttons/ButtonPurple'

const CartWrapper = () => {
	return (
		<>
			<CartTable />
			<div className={styles.bottom}>
				<Link to={'/home/products?gender=men'} className={styles.buttonTransparent}>
					Continue Shopping
				</Link>
				<div className={styles.totalWrapper}>
					<div className={styles.priceWrapper}>
						<div className={styles.totalTop}>
							<span className={styles.total}>Grand Total:</span>
							<span className={styles.total}> $3500</span>
						</div>
					</div>
					<ButtonPurple style={{ width: 'max-content', alignSelf: 'center' }} title={'Proceed To Checkout'} />
				</div>
			</div>
		</>
	)
}

export default CartWrapper
