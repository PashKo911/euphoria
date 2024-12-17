import { Link, NavLink } from 'react-router-dom'
import constants from '../../utils/constants'
import { RiDeleteBinLine } from 'react-icons/ri'
import { RiEditLine } from 'react-icons/ri'
import { SlHandbag } from 'react-icons/sl'
import { FaUsers } from 'react-icons/fa'

import styles from './dashboard.module.scss'
import TitleDecor from '../../components/TitleDecor'
import ButtonPurple from '../../components/buttons/ButtonPurple'

const Dashboard = () => {
	return (
		<section className={styles.dashboard}>
			<div className={styles.container}>
				<aside className={styles.aside}>
					<div className={styles.asideHeader}>
						<TitleDecor title={'Hello Jhanvi'} />
						<div className={styles.asideSubtitle}>Welcome to dashboard</div>
					</div>
					<ul className={styles.asideList}>
						<li className={styles.asideItem}>
							<NavLink
								to={'/dashboard'}
								className={({ isActive }) =>
									isActive ? `${styles.asideLink} ${styles.active}` : styles.asideLink
								}>
								<SlHandbag />
								Products
							</NavLink>
						</li>
						<li className={styles.asideItem}>
							<NavLink
								to={'/dashboard/users'}
								className={({ isActive }) =>
									isActive ? `${styles.asideLink} ${styles.active}` : styles.asideLink
								}>
								<FaUsers />
								Users
							</NavLink>
						</li>
					</ul>
				</aside>
				<div className={styles.body}>
					<div className={styles.bodyHeader}>
						<h2 className={styles.title}>Products</h2>
						<ButtonPurple to={'/products/add'} title={'Add'} />
					</div>
					<table>
						<thead>
							<tr>
								<th>Product details</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>
							<tr>
								<td className={styles.details}>
									{/* <img src={`${constants.API_BASE}${path}`} alt={title} /> */}
									<img src="/assets/img/auth/signIn.png" alt="image" />
									<div className={styles.detailsContent}>
										<h3 className={styles.detailsTitle}>Blue Flower Print Crop Top</h3>
										<div className={styles.detailsSub}>Color : Yellow</div>
										<div className={styles.detailsSub}>Size : M</div>
									</div>
								</td>
								<td>$29.00</td>
								<td>3</td>
								<td>
									<div className={styles.actions}>
										<Link to={'/dashboard/edit'}>
											<RiEditLine size={20} />
										</Link>
										<button type="button">
											<RiDeleteBinLine size={20} />
										</button>
									</div>
								</td>
							</tr>
							<tr>
								<td className={styles.details}>
									{/* <img src={`${constants.API_BASE}${path}`} alt={title} /> */}
									<img src="/assets/img/auth/signIn.png" alt="image" />
									<div className={styles.detailsContent}>
										<h3 className={styles.detailsTitle}>Blue Flower Print Crop Top</h3>
										<div className={styles.detailsSub}>Color : Yellow</div>
										<div className={styles.detailsSub}>Size : M</div>
									</div>
								</td>
								<td>$29.00</td>
								<td>3</td>
								<td>
									<div className={styles.actions}>
										<Link to={'/dashboard/edit'}>
											<RiEditLine size={20} />
										</Link>
										<button type="button">
											<RiDeleteBinLine size={20} />
										</button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>
	)
}

export default Dashboard
