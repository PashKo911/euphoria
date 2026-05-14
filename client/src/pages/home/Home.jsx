import { Link } from 'react-router-dom'
import HeroMainSlider from '../../components/sliders/HeroMainSlider'
import TitleDecor from '../../components/TitleDecor'

import './home.scss'
import Button from '../../components/buttons/Button'

const Home = () => {
	return (
		<>
			<section className="hero">
				<HeroMainSlider />
			</section>
			<div className="deals">
				<div className="deals__container">
					<article className="deals__item">
						<div className="deals__content">
							<div className="deals__label">Low Price</div>
							<h4 className="deals__title">High Coziness</h4>
							<div className="deals__sale">UPTO 50% OFF</div>
							<Link to={'/products?gender=men&page=0'} className="deals__link">
								Explore Items
							</Link>
						</div>
						<img src="/assets/img/deals/01.jpg" className="deals__image" alt="Image" />
					</article>
					<article className="deals__item">
						<div className="deals__content">
							<div className="deals__label">Beyoung Presents</div>
							<h4 className="deals__title">
								Breezy Summer <br /> Style
							</h4>
							<div className="deals__sale">UPTO 50% OFF</div>
							<Link to={'/products?gender=men&page=0'} className="deals__link">
								Explore Items
							</Link>
						</div>
						<img src="/assets/img/deals/02.jpg" className="deals__image" alt="Image" />
					</article>
				</div>
			</div>
			<section className="sale">
				<div className="sale__container">
					<TitleDecor title={'Big Saving Zone'} />
					<div className="sale__items">
						<article className="sale__item item-sale">
							<div className="item-sale__body">
								<h4 className="item-sale__title">
									<Link to={'/products?gender=men&page=0'} className="item-sale__link-title">
										Hawaiian <br /> Shirts
									</Link>
								</h4>
								<div className="item-sale__label">Dress up in summer vibe</div>
								<div className="item-sale__info">UPTO 50% OFF</div>
								<div className="item-sale__arrow ">
									<svg viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M6 0.416748C6.41421 0.416748 6.75 0.752535 6.75 1.16675L6.75 11.0228L10.4697 7.30308C10.7626 7.01019 11.2374 7.01019 11.5303 7.30308C11.8232 7.59598 11.8232 8.07085 11.5303 8.36375L7.11959 12.7745C6.50126 13.3928 5.49874 13.3928 4.88041 12.7745L0.46967 8.36374C0.176777 8.07085 0.176777 7.59598 0.46967 7.30308C0.762563 7.01019 1.23744 7.01019 1.53033 7.30308L5.25 11.0228L5.25 1.16675C5.25 0.752534 5.58579 0.416748 6 0.416748Z"
										/>
									</svg>

									<Link to={'/products?gender=men&page=0'} className="item-sale__button">
										SHOP NOW
									</Link>
								</div>
							</div>
							<img className="item-sale__image" src="/assets/img/sale/01.jpg" alt="Image" />
						</article>
						<article className="sale__item item-sale item-sale--right item-sale--text-right">
							<div className="item-sale__body">
								<div className="item-sale__limited">Limited Stock</div>
								<h4 className="item-sale__title">
									<Link to={'/products?gender=men&page=0'} className="item-sale__link-title">
										Printed <br /> T-Shirt
									</Link>
								</h4>
								<div className="item-sale__label">Dress up in summer vibe</div>
								<div className="item-sale__info">UPTO 50% OFF</div>
								<div className="item-sale__arrow">
									<svg viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M6 0.416748C6.41421 0.416748 6.75 0.752535 6.75 1.16675L6.75 11.0228L10.4697 7.30308C10.7626 7.01019 11.2374 7.01019 11.5303 7.30308C11.8232 7.59598 11.8232 8.07085 11.5303 8.36375L7.11959 12.7745C6.50126 13.3928 5.49874 13.3928 4.88041 12.7745L0.46967 8.36374C0.176777 8.07085 0.176777 7.59598 0.46967 7.30308C0.762563 7.01019 1.23744 7.01019 1.53033 7.30308L5.25 11.0228L5.25 1.16675C5.25 0.752534 5.58579 0.416748 6 0.416748Z"
										/>
									</svg>
									<Link to={'/products?gender=men&page=0'} className="item-sale__button">
										SHOP NOW
									</Link>
								</div>
							</div>
							<img className="item-sale__image" src="/assets/img/sale/02.jpg" alt="Image" />
						</article>
						<article className="sale__item item-sale item-sale--dark item-sale--right">
							<div className="item-sale__body">
								<h4 className="item-sale__title">
									<Link to={'/products?gender=men&page=0'} className="item-sale__link-title">
										Cargo <br /> Joggers
									</Link>
								</h4>
								<div className="item-sale__label">Dress up in summer vibe</div>
								<div className="item-sale__info">UPTO 50% OFF</div>
								<div className="item-sale__arrow">
									<svg viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M6 0.416748C6.41421 0.416748 6.75 0.752535 6.75 1.16675L6.75 11.0228L10.4697 7.30308C10.7626 7.01019 11.2374 7.01019 11.5303 7.30308C11.8232 7.59598 11.8232 8.07085 11.5303 8.36375L7.11959 12.7745C6.50126 13.3928 5.49874 13.3928 4.88041 12.7745L0.46967 8.36374C0.176777 8.07085 0.176777 7.59598 0.46967 7.30308C0.762563 7.01019 1.23744 7.01019 1.53033 7.30308L5.25 11.0228L5.25 1.16675C5.25 0.752534 5.58579 0.416748 6 0.416748Z"
										/>
									</svg>
									<Link to={'/products?gender=men&page=0'} className="item-sale__button">
										SHOP NOW
									</Link>
								</div>
							</div>
							<img className="item-sale__image" src="/assets/img/sale/03.jpg" alt="Image" />
						</article>
						<article className="sale__item item-sale item-sale--dark item-sale--right">
							<div className="item-sale__body">
								<h4 className="item-sale__title">
									<Link to={'/products?gender=men&page=0'} className="item-sale__link-title">
										Urban <br /> Shirts
									</Link>
								</h4>
								<div className="item-sale__label">Dress up in summer vibe</div>
								<div className="item-sale__info">UPTO 50% OFF</div>
								<div className="item-sale__arrow">
									<svg viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M6 0.416748C6.41421 0.416748 6.75 0.752535 6.75 1.16675L6.75 11.0228L10.4697 7.30308C10.7626 7.01019 11.2374 7.01019 11.5303 7.30308C11.8232 7.59598 11.8232 8.07085 11.5303 8.36375L7.11959 12.7745C6.50126 13.3928 5.49874 13.3928 4.88041 12.7745L0.46967 8.36374C0.176777 8.07085 0.176777 7.59598 0.46967 7.30308C0.762563 7.01019 1.23744 7.01019 1.53033 7.30308L5.25 11.0228L5.25 1.16675C5.25 0.752534 5.58579 0.416748 6 0.416748Z"
										/>
									</svg>
									<Link to={'/products?gender=men&page=0'} className="item-sale__button">
										SHOP NOW
									</Link>
								</div>
							</div>
							<img className="item-sale__image" src="/assets/img/sale/04.jpg" alt="Image" />
						</article>
						<article className="sale__item item-sale item-sale--dark item-sale--right">
							<div className="item-sale__body">
								<h4 className="item-sale__title">
									<Link to={'/products?gender=men&page=0'} className="item-sale__link-title">
										Oversized <br /> T-Shirts
									</Link>
								</h4>
								<div className="item-sale__label">Dress up in summer vibe</div>
								<div className="item-sale__info">UPTO 50% OFF</div>
								<div className="item-sale__arrow">
									<svg viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M6 0.416748C6.41421 0.416748 6.75 0.752535 6.75 1.16675L6.75 11.0228L10.4697 7.30308C10.7626 7.01019 11.2374 7.01019 11.5303 7.30308C11.8232 7.59598 11.8232 8.07085 11.5303 8.36375L7.11959 12.7745C6.50126 13.3928 5.49874 13.3928 4.88041 12.7745L0.46967 8.36374C0.176777 8.07085 0.176777 7.59598 0.46967 7.30308C0.762563 7.01019 1.23744 7.01019 1.53033 7.30308L5.25 11.0228L5.25 1.16675C5.25 0.752534 5.58579 0.416748 6 0.416748Z"
										/>
									</svg>
									<Link to={'/products?gender=men&page=0'} className="item-sale__button">
										SHOP NOW
									</Link>
								</div>
							</div>
							<img className="item-sale__image" src="/assets/img/sale/05.jpg" alt="Image" />
						</article>
					</div>
				</div>
			</section>
			<section className="page__shop-now shop-now">
				<div className="shop-now__container">
					<div className="shop-now__content">
						<h2 className="shop-now__title">WE MADE YOUR EVERYDAY FASHION BETTER!</h2>
						<div className="shop-now__text">
							<p>
								In our journey to improve everyday fashion, euphoria presents EVERYDAY wear range -
								Comfortable & Affordable fashion 24/7
							</p>
						</div>
						<Button title={'Shop Now'} variant="white" to={'/products?gender=men&page=0'} />
					</div>
					<img className="shop-now__image" src="/assets/img/shop-now/01.jpg" alt="Image" />
				</div>
			</section>
			<section className="page__top-brands top-brands">
				<div className="top-brands__container">
					<div className="top-brands__body">
						<h2 className="top-brands__title">Top Brands Deal</h2>
						<div className="top-brands__info">
							Up To <span>60%</span> off on brands
						</div>
						<div className="top-brands__items">
							<Link target="_blank" className="top-brands__item">
								<img src="/assets/img/brands/01.png" alt="Image" />
							</Link>
							<Link target="_blank" className="top-brands__item">
								<img src="/assets/img/brands/02.png" alt="Image" />
							</Link>
							<Link target="_blank" className="top-brands__item">
								<img src="/assets/img/brands/03.png" alt="Image" />
							</Link>
							<Link target="_blank" className="top-brands__item">
								<img src="/assets/img/brands/04.png" alt="Image" />
							</Link>
							<Link target="_blank" className="top-brands__item">
								<img src="/assets/img/brands/05.png" alt="Image" />
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Home
