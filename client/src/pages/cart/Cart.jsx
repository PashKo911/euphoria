import { Link } from 'react-router-dom'
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs'
import { useAuth } from '../../context/AuthContext'
import styles from './cart.module.scss'
import CartTable from './CartTable'
import CartWrapper from './CartWrapper'

const Cart = () => {
	const { isAuthenticated } = useAuth()

	return (
		<section className={styles.cart}>
			<div className={styles.container}>
				<Breadcrumbs customStyles={{ marginBottom: 30 }} />
				{!isAuthenticated && (
					<div className={styles.text}>
						<p>Please fill in the fields below and click place order to complete your purchase!</p>
						<p>
							Already registered?{' '}
							<Link to={'/home/auth/sign-in'} className={styles.navLink}>
								{' '}
								Please login here
							</Link>
						</p>
					</div>
				)}
				<CartWrapper />
			</div>
		</section>
	)
}

export default Cart
