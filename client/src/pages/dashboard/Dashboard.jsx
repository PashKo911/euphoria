import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import useHttp from '../../hooks/useHttp'
import { useFilter } from '../../context/FilterProvider'
import useRouteAccessSwitcher from '../../hooks/useRouteAccessSwitcher'

import TitleDecor from '../../components/TitleDecor'
import Button from '../../components/buttons/Button'
import ClearFilterBlock from '../../components/filters/ClearFilterBlock'
import Filter from '../../components/filters/Filter'
import FilterSort from '../../components/filters/FilterSort'

import { SlHandbag } from 'react-icons/sl'
import { FaUsers } from 'react-icons/fa'

import styles from './dashboard.module.scss'
import NotFound from '../notFound/NotFound'

const Dashboard = () => {
	const location = useLocation()
	const isUsersPage = location.pathname.includes('users')
	const isAddPath = location.pathname.includes('add')
	const title = isUsersPage ? 'Users' : 'Products'
	const addPath = isUsersPage ? '/home/dashboard/users/add' : '/home/dashboard/products/add'
	const isFormPage = location.pathname.includes('add')
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const { user } = useAuth()
	const { get } = useHttp()
	const [filterOptions, setFilterOptions] = useState({})
	const { state, dispatch } = useFilter()
	const hasAccess = useRouteAccessSwitcher(['admin', 'manager'])

	useEffect(() => {
		const fetchFilterOptions = async () => {
			try {
				const data = await get('/products/options')
				setFilterOptions(data)
			} catch (error) {
				console.error('Error fetching filters:', error)
			}
		}
		fetchFilterOptions()
	}, [])

	if (!hasAccess) {
		return <NotFound />
	}

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
								to="/home/dashboard/products"
								className={({ isActive }) =>
									isActive ? `${styles.asideLink} ${styles.active}` : styles.asideLink
								}>
								<SlHandbag />
								Products
							</NavLink>
						</li>
						<li className={styles.asideItem}>
							<NavLink
								to="/home/dashboard/users"
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
					{!isFormPage && !isUsersPage && (
						<Filter options={filterOptions} isFilterOpen={isFilterOpen} callback={setIsFilterOpen} />
					)}

					<div className={styles.body}>
						<div className={styles.bodyHeader}>
							<div className={styles.bodyHeaderTop}>
								<h2 className={styles.title}>{title}</h2>
								{!isAddPath && <Button to={addPath} title="Add" />}
							</div>
							{!isFormPage && !isUsersPage && (
								<FilterSort
									styles={{ marginBottom: 20 }}
									isFilterOpen={isFilterOpen}
									callback={setIsFilterOpen}
								/>
							)}
							{!isFormPage && (
								<ClearFilterBlock state={state} filterOptions={filterOptions} dispatch={dispatch} />
							)}
						</div>
						<Outlet />
					</div>
				</div>
			</div>
		</section>
	)
}

export default Dashboard
