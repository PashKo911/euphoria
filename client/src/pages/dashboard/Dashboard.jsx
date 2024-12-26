import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { SlHandbag } from 'react-icons/sl'
import { FaUsers } from 'react-icons/fa'
import { useState } from 'react'

import TitleDecor from '../../components/TitleDecor'
import ButtonPurple from '../../components/buttons/ButtonPurple'
import Filter from '../../components/filters/Filter'
import FilterSort from '../../components/filters/FilterSort'
import { useAuth } from '../../context/AuthContext'

import styles from './dashboard.module.scss'

const Dashboard = () => {
	const location = useLocation()
	const isUsersPage = location.pathname.includes('users')
	const isAddPath = location.pathname.includes('add')
	const title = isUsersPage ? 'Users' : 'Products'
	const addPath = isUsersPage ? '/dashboard/users/add' : '/dashboard/products/add'
	const isFormPage = location.pathname.includes('add')
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const { user } = useAuth()

	return (
		<section className={styles.dashboard}>
			<div className={styles.container}>
				<div className={styles.top}>
					<div className={styles.header}>
						<TitleDecor title={`Hello ${user?.name} `} />
					</div>
					<ul className={styles.list}>
						<li className={styles.asideItem}>
							<NavLink
								to="/dashboard/products"
								className={({ isActive }) =>
									isActive ? `${styles.asideLink} ${styles.active}` : styles.asideLink
								}>
								<SlHandbag />
								Products
							</NavLink>
						</li>
						<li className={styles.asideItem}>
							<NavLink
								to="/dashboard/users"
								className={({ isActive }) =>
									isActive ? `${styles.asideLink} ${styles.active}` : styles.asideLink
								}>
								<FaUsers />
								Users
							</NavLink>
						</li>
					</ul>
				</div>
				<div className={styles.content}>
					{!isFormPage && <Filter isFilterOpen={isFilterOpen} callback={setIsFilterOpen} />}

					<div className={styles.body}>
						<div className={styles.bodyHeader}>
							<div className={styles.bodyHeaderTop}>
								<h2 className={styles.title}>{title}</h2>
								{!isAddPath && <ButtonPurple to={addPath} title="Add" />}
							</div>
							{!isFormPage && <FilterSort isFilterOpen={isFilterOpen} callback={setIsFilterOpen} />}
						</div>
						<Outlet />
					</div>
				</div>
			</div>
		</section>
	)
}

export default Dashboard
