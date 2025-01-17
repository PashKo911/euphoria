import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'

import { MdFavoriteBorder } from 'react-icons/md'
import { LuUser2 } from 'react-icons/lu'
import { FiShoppingCart } from 'react-icons/fi'
import { IoMdLogIn } from 'react-icons/io'
import { IoMdLogOut } from 'react-icons/io'
import { BsKey } from 'react-icons/bs'
import { useCart } from '../../context/CartContext'

import { useAuth } from '../../context/AuthContext'
import { useFilter } from '../../context/FilterProvider'
import useRouteAccessSwitcher from '../../hooks/useRouteAccessSwitcher'
import SearchForm from '../searchForm/SearchForm'

import './navbar.scss'

const Navbar = () => {
	const [showMenu, setShowMenu] = useState(false)
	const { isAuthenticated, logout } = useAuth()
	const navigate = useNavigate()
	const location = useLocation()
	const { dispatch } = useFilter()
	const hasAccess = useRouteAccessSwitcher(['admin', 'manager'])
	const { cart } = useCart()

	const handleLogout = async () => {
		try {
			logout()
			navigate('/products')
			dispatch({ type: 'SET_GENDER', payload: 'men' })
			dispatch({ type: 'SET_PAGE', payload: 0 })
			setShowMenu(false)
		} catch (error) {
			console.error('Error during logout:', error.message)
		}
	}

	const isActive = (gender) => {
		const params = new URLSearchParams(location.search)
		return params.get('gender') === gender
	}

	const handlePage = () => {
		setShowMenu(false)
		// dispatch({ type: 'CLEAR_ALL_FILTERS' })
	}

	return (
		<header className={`${showMenu ? 'header menu-open' : 'header'}`}>
			<div className="header__container">
				<img className="header__logo" src="/logo.svg" alt="Image" aria-label="Website's Logotype" />
				<div className="header__menu menu">
					<nav className="menu__body">
						<ul className="menu__list">
							<li className="menu__item">
								<NavLink to={'/'} className="menu__link" onClick={handlePage}>
									Shop
								</NavLink>
							</li>
							<li className="menu__item">
								<Link
									to={'/products?gender=men&page=0'}
									onClick={handlePage}
									className={`menu__link ${isActive('men') ? 'active' : ''}`}>
									Men
								</Link>
							</li>
							<li className="menu__item">
								<Link
									to={'/products?gender=women&page=0'}
									onClick={handlePage}
									className={`menu__link ${isActive('women') ? 'active' : ''}`}>
									Women
								</Link>
							</li>
						</ul>
					</nav>
				</div>
				<SearchForm />
				<div className="header__action action-header">
					<Link className="action-header__item" aria-label="Favorite">
						<MdFavoriteBorder />
					</Link>
					{isAuthenticated ? (
						<>
							<NavLink
								to={'/profile'}
								className="action-header__item"
								aria-label="Profile"
								onClick={handlePage}>
								<LuUser2 />
							</NavLink>
						</>
					) : (
						<NavLink
							to={'/auth/sign-in'}
							className="action-header__item"
							aria-label="Login"
							onClick={handlePage}>
							<IoMdLogIn />
						</NavLink>
					)}
					<NavLink
						key={cart}
						to={'/cart'}
						className="action-header__item action-header__item--counter"
						aria-label="Cart"
						onClick={handlePage}>
						<FiShoppingCart />
						<span>{cart?.productsList?.length > 0 && cart?.productsList?.length}</span>
					</NavLink>
					{isAuthenticated && (
						<button onClick={handleLogout} type="button" className="action-header__item" aria-label="Logout">
							<IoMdLogOut />
						</button>
					)}
					{hasAccess && (
						<NavLink
							to={'/dashboard/products'}
							className="action-header__item"
							aria-label="Cart"
							onClick={handlePage}>
							<BsKey />
						</NavLink>
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
