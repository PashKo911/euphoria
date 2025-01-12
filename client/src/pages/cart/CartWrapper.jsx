import { Link } from 'react-router-dom'
import CartTable from './CartTable'
import useHttp from '../../hooks/useHttp'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

import styles from './cartWrapper.module.scss'
import ButtonPurple from '../../components/buttons/ButtonPurple'

const CartWrapper = () => {
	const [cartDetails, setCartDetails] = useState()
	const { processes, get, put, del } = useHttp()
	const { user, isAuthenticated } = useAuth()
	const { updateCart, cart } = useCart()

	const getCart = async () => {
		const cart = await get('/cart')
		setCartDetails(cart)
	}

	const amountHandler = async (productId, amount) => {
		const formData = {
			productId,
			amount,
		}
		const cart = await put('/cart/amount', formData)
		updateCart(cart.cart)
	}
	const deleteHandler = async (productId) => {
		const cart = await del('/cart/delete', productId)
		updateCart(cart.cart)
	}

	useEffect(() => {
		if (user) {
			getCart()
		}
	}, [user, cart])

	return (
		<>
			<CartTable
				products={cartDetails?.products}
				amountHandler={amountHandler}
				deleteHandler={deleteHandler}
				processes={processes}
			/>
			<div className={styles.bottom}>
				<Link to={'/home/products?gender=men'} className={styles.buttonTransparent}>
					Continue Shopping
				</Link>
				<div className={styles.totalWrapper}>
					<div className={styles.priceWrapper}>
						<div className={styles.totalTop}>
							<span className={styles.total}>Grand Total:</span>
							<span className={styles.total}>${cartDetails?.total.toFixed(2)}</span>
						</div>
					</div>
					<ButtonPurple style={{ width: 'max-content', alignSelf: 'center' }} title={'Proceed To Checkout'} />
				</div>
			</div>
		</>
	)
}

export default CartWrapper
