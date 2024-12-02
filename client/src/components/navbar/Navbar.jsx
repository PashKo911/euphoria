import './navbar.scss'
import { HiOutlineSearch } from 'react-icons/hi'
import { MdFavoriteBorder } from 'react-icons/md'
import { LuUser2 } from 'react-icons/lu'
import { FiShoppingCart } from 'react-icons/fi'
import { useState } from 'react'

const Navbar = () => {
	const [showMenu, setShowMenu] = useState(false)

	return (
		<header className="header">
			<div className="header__container">
				<img className="header__logo" src="/logo.svg" alt="Image" />
				<div className="header__menu menu">
					<nav className="menu__body">
						<ul className="menu__list">
							<li className="menu__item">
								<a href="#" className="menu__link menu__link--active">
									Shop
								</a>
							</li>
							<li className="menu__item">
								<a href="#" className="menu__link">
									Men
								</a>
							</li>
							<li className="menu__item">
								<a href="#" className="menu__link">
									Women
								</a>
							</li>
							<li className="menu__item">
								<a href="#" className="menu__link">
									Combos
								</a>
							</li>
							<li className="menu__item">
								<a href="#" className="menu__link">
									Joggers
								</a>
							</li>
						</ul>
					</nav>
				</div>
				<form action="#" className="header__search search-form">
					<input className="search-form__input" placeholder="Search" type="text" />
					<button className="search-form__button">
						<HiOutlineSearch />
					</button>
				</form>
				<div className="header__action action-header">
					<a href="#" className="action-header__item">
						<MdFavoriteBorder />
					</a>
					<a href="#" className="action-header__item">
						<LuUser2 />
					</a>
					<a href="#" className="action-header__item">
						<FiShoppingCart />
					</a>
				</div>
				<button className="icon-menu">
					<span></span>
				</button>
			</div>
		</header>
	)
}

export default Navbar
