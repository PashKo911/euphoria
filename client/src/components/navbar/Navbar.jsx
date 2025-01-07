import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'

import { MdFavoriteBorder } from 'react-icons/md'
import { LuUser2 } from 'react-icons/lu'
import { FiShoppingCart } from 'react-icons/fi'
import { IoMdLogIn } from 'react-icons/io'
import { IoMdLogOut } from 'react-icons/io'
import { BsKey } from 'react-icons/bs'

import { useAuth } from '../../context/AuthContext'
import { useFilter } from '../../context/FilterProvider'
import useRouteAccessSwitcher from '../../hooks/useRouteAccessSwitcher'

import './navbar.scss'
import SearchForm from '../searchForm/SearchForm'

const Navbar = () => {
	const [showMenu, setShowMenu] = useState(false)
	const { isAuthenticated, logout } = useAuth()
	const navigate = useNavigate()
	const location = useLocation()
	const { dispatch } = useFilter()
	const hasAccess = useRouteAccessSwitcher(['admin', 'manager'])

	const handleLogout = async () => {
		try {
			logout()
			navigate('/products')
			dispatch({ type: 'SET_GENDER', payload: 'men' })
		} catch (error) {
			console.error('Error during logout:', error.message)
		}
	}

	const isActive = (gender) => {
		const params = new URLSearchParams(location.search)
		return params.get('gender') === gender
	}

	return (
		<header className={`${showMenu ? 'header menu-open' : 'header'}`}>
			<div className="header__container">
				<img className="header__logo" src="/logo.svg" alt="Image" aria-label="Website's Logotype" />
				<div className="header__menu menu">
					<nav className="menu__body">
						<ul className="menu__list">
							<li className="menu__item">
								<NavLink to={'/home'} className="menu__link">
									Home
								</NavLink>
							</li>
							<li className="menu__item">
								<Link to={'/products?gender=men'} className={`menu__link ${isActive('men') ? 'active' : ''}`}>
									Men
								</Link>
							</li>
							<li className="menu__item">
								<Link
									to={'/products?gender=women'}
									className={`menu__link ${isActive('women') ? 'active' : ''}`}>
									Women
								</Link>
							</li>
						</ul>
					</nav>
				</div>
				<SearchForm />
				<div className="header__action action-header">
					<NavLink to={'/home'} className="action-header__item" aria-label="Favorite">
						<MdFavoriteBorder />
					</NavLink>
					{isAuthenticated ? (
						<>
							<NavLink to={'/profile'} className="action-header__item" aria-label="Profile">
								<LuUser2 />
							</NavLink>
						</>
					) : (
						<NavLink to={'/auth/sign-in'} className="action-header__item" aria-label="Login">
							<IoMdLogIn />
						</NavLink>
					)}
					<Link to={'/home'} className="action-header__item" aria-label="Cart">
						<FiShoppingCart />
					</Link>
					{isAuthenticated && (
						<button onClick={handleLogout} type="button" className="action-header__item" aria-label="Logout">
							<IoMdLogOut />
						</button>
					)}
					{hasAccess && (
						<Link to={'/dashboard/products'} className="action-header__item" aria-label="Cart">
							<BsKey />
						</Link>
					)}
				</div>

				<button className="icon-menu" onClick={() => setShowMenu(!showMenu)}>
					<span></span>
				</button>
			</div>
		</header>
	)
}

export default Navbar
