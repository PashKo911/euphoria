import { useLocation, NavLink } from 'react-router-dom'

import styles from './breadcrumbs.module.scss'

const breadcrumbsConfig = {
	'/': 'Shop',
	'/products': 'Products',
	'/products/detail': 'Product Details',
	'/cart': 'Add To Cart',
}

const getBreadcrumbLabel = (route) => {
	if (breadcrumbsConfig[route]) return breadcrumbsConfig[route]
	return decodeURIComponent(route.split('/').pop())
}

const Breadcrumbs = ({ customStyles }) => {
	const location = useLocation()
	const paths = location.pathname.split('/').filter(Boolean)

	const breadcrumbs = paths.map((path, index) => {
		const route = `/${paths.slice(0, index + 1).join('/')}`
		const label = getBreadcrumbLabel(route)
		return { label, route }
	})

	const fullBreadcrumbs = [{ label: breadcrumbsConfig['/'], route: '/' }, ...breadcrumbs]

	return (
		<ul className={styles.list} style={customStyles}>
			{fullBreadcrumbs.map(({ label, route }, idx) => (
				<li className={styles.item} key={route}>
					{idx === fullBreadcrumbs.length - 1 ? <span>{label}</span> : <NavLink to={route}>{label}</NavLink>}
				</li>
			))}
		</ul>
	)
}

export default Breadcrumbs
