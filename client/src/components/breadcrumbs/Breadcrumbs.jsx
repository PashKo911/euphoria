import { useLocation, NavLink } from 'react-router-dom'

import styles from './breadcrumbs.module.scss'

const breadcrumbsConfig = {
	'/home': 'Home',
	'/home/products': 'Products',
	'/home/products/detail': 'Product Details',
	'/home/cart': 'Add To Cart',
}

const getBreadcrumbLabel = (route) => {
	if (breadcrumbsConfig[route]) return breadcrumbsConfig[route]
	return decodeURIComponent(route.split('/').pop())
}

const Breadcrumbs = ({ customStyles }) => {
	const location = useLocation()
	const paths = location.pathname.split('/').filter(Boolean)

	const breadcrumbs = paths.map((path, index) => {
		let route = `/${paths.slice(0, index + 1).join('/')}`
		let label = getBreadcrumbLabel(route)
		if (route === '/home') {
			route = `${route}/shop`
		}
		return {
			label,
			route,
		}
	})

	return (
		<ul className={styles.list} style={customStyles}>
			{breadcrumbs.map(({ label, route }, idx) => (
				<li className={styles.item} key={route}>
					{idx === breadcrumbs.length - 1 ? <span>{label}</span> : <NavLink to={route}>{label}</NavLink>}
				</li>
			))}
		</ul>
	)
}

export default Breadcrumbs
