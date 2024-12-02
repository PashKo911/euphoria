import { Link, NavLink } from 'react-router-dom'

import { HiOutlineSearch } from 'react-icons/hi'
import { MdFavoriteBorder } from 'react-icons/md'
import { LuUser2 } from 'react-icons/lu'
import { FiShoppingCart } from 'react-icons/fi'
import { useState } from 'react'

import './navbar.scss'

const Navbar = () => {
	const [showMenu, setShowMenu] = useState(false)

	return (
		<header className={`${showMenu ? 'header menu-open' : 'header'}`}>
			<div className="header__container">
				<img className="header__logo" src="/logo.svg" alt="Image" aria-label="Website's Logotype" />
				<div className="header__menu menu">
					<nav className="menu__body">
						<ul className="menu__list">
							<li className="menu__item">
								<NavLink to={'/home'} className="menu__link">
									Shop
								</NavLink>
							</li>
							<li className="menu__item">
								<NavLink to={'/products/men'} className="menu__link">
									Men
								</NavLink>
							</li>
							<li className="menu__item">
								<NavLink to={'/products/women'} className="menu__link">
									Women
								</NavLink>
							</li>
							<li className="menu__item">
								<NavLink to={'/products/combos'} className="menu__link">
									Combos
								</NavLink>
							</li>
							<li className="menu__item">
								<NavLink to={'/products/joggers'} className="menu__link">
									Joggers
								</NavLink>
							</li>
						</ul>
					</nav>
				</div>
				<form action="#" className="header__search search-form">
					<input className="search-form__input" placeholder="Search" type="text" />
					<button className="search-form__button" aria-label="Search Form">
						<HiOutlineSearch />
					</button>
				</form>
				<div className="header__action action-header">
					<Link to={'/home'} className="action-header__item" aria-label="Favorite">
						<MdFavoriteBorder />
					</Link>
					<Link to={'/home'} className="action-header__item" aria-label="Profile">
						<LuUser2 />
					</Link>
					<Link to={'/home'} className="action-header__item" aria-label="Cart">
						<FiShoppingCart />
					</Link>
				</div>
				<button className="icon-menu" onClick={() => setShowMenu(!showMenu)}>
					<span></span>
				</button>
			</div>
		</header>
	)
}

export default Navbar
