import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs'
import { useAuth } from '../../context/AuthContext'
import CartWrapper from './CartWrapper'
import { useCart } from '../../context/CartContext'
import ButtonPurple from '../../components/buttons/ButtonPurple'

import styles from './cart.module.scss'

const Cart = () => {
	const { isAuthenticated } = useAuth()
	const { cart } = useCart()
	const isEmptyCart = Boolean(!cart?.productsList?.length)

	return (
		<section className={styles.cart}>
			<div className={styles.container}>
				{isEmptyCart ? (
					<div className={styles.emptyCart}>
						<div className={styles.img}>
							<img src="/assets/img/cart/cart.svg" alt="Empty cart image" />
						</div>
						<h1 className={styles.title}>Your cart is empty and sad :(</h1>
						<h2 className={styles.subtitle}>Add something to make it happy!</h2>
						<ButtonPurple to={'/home/products?gender=men'} title={'Continue Shopping'} />
					</div>
				) : (
					<>
						<Breadcrumbs customStyles={{ marginBottom: 30 }} />
						{!isAuthenticated && (
							<div className={styles.text}>
								<p>Please fill in the fields below and click place order to complete your purchase!</p>
								<p>
									Already registered?{' '}
									<Link to={'/home/auth/sign-in'} className={styles.navLink}>
										Please login here
									</Link>
								</p>
							</div>
						)}
						<CartWrapper />
					</>
				)}
			</div>
		</section>
	)
}

export default Cart
