// pages/About.js
import React from 'react'

import ColorsInput from './ColorsInput'

import { GiSettingsKnobs } from 'react-icons/gi'
import { IoIosArrowUp } from 'react-icons/io'

import './products.scss'
import SizeInput from './SizeInput'
import CategoryInput from './CategoryInput'
import SliderInput from './SliderInput'

const Products = () => {
	return (
		<>
			<div className="page__catalog catalog">
				<section className="catalog__main">
					<div className="catalog__container">
						<aside className="catalog__filter filter">
							<h4 data-spoller="open" data-spoller-media="max,991.98" className="filter__title title-filter">
								<button type="button" className="title-filter__button title-filter__button--main">
									Filter
									<GiSettingsKnobs />
								</button>
							</h4>
							<form action="#" className="filter__body">
								<div className="filter__section section-filter">
									<div className="section-filter__body">
										<CategoryInput title={'Tops'} />
										<CategoryInput title={'Printed T-shirts'} />
										<CategoryInput title={'Plain T-shirts'} />
										<CategoryInput title={'Kurti'} />
									</div>
								</div>
								<div className="filter__section section-filter">
									<h5 data-spoller="open" className="section-filter__title title-filter">
										<button type="button" className="title-filter__button _icon-ch-down">
											Price
											<IoIosArrowUp size={'1em'} />
										</button>
									</h5>
									<div className="section-filter__body">
										<SliderInput />
										{/* <div className="section-filter__price price-filter">
											<div className="price-filter__range"></div>
											<div className="price-filter__inputs">
												<input
													type="text"
													name="price-from"
													className="price-filter__input price-filter__input--from"
												/>
												<input
													type="text"
													name="price-to"
													className="price-filter__input price-filter__input--to"
												/>
											</div>
										</div> */}
									</div>
								</div>
								<div className="filter__section section-filter">
									<h5 data-spoller="open" className="section-filter__title title-filter">
										<button type="button" className="title-filter__button _icon-ch-down">
											Colors
											<IoIosArrowUp size={'1em'} />
										</button>
									</h5>
									<div className="section-filter__body">
										<div className="section-filter__colors colors-filter">
											<ColorsInput title={'Purple'} color={'#8434e1'} />
											<ColorsInput title={'Black'} color={'#000000'} />
											<ColorsInput title={'Red'} color={'#F35528'} />
											<ColorsInput title={'Orange'} color={'#F16F2B'} />
											<ColorsInput title={'Navy'} color={'#345EFF'} />
										</div>
									</div>
								</div>
								<div className="filter__section section-filter">
									<h5 data-spoller="open" className="section-filter__title title-filter">
										<button type="button" className="title-filter__button _icon-ch-down">
											Size
											<IoIosArrowUp size={'1em'} />
										</button>
									</h5>
									<div className="section-filter__body">
										<div className="section-filter__size size-filter">
											<SizeInput title={'XXS'} />
											<SizeInput title={'XS'} />
											<SizeInput title={'S'} />
											<SizeInput title={'M'} />
											<SizeInput title={'L'} />
										</div>
									</div>
								</div>
								<div className="filter__section section-filter">
									<h5 data-spoller="open" className="section-filter__title title-filter">
										<button type="button" className="title-filter__button ">
											Dress Style
											<IoIosArrowUp size={'1em'} />
										</button>
									</h5>
									<div className="section-filter__body">
										<div className="section-filter__style style-filter">
											<CategoryInput title={'Classic'} />
											<CategoryInput title={'Casual'} />
											<CategoryInput title={'Business'} />
										</div>
									</div>
								</div>
							</form>
						</aside>
						<div className="catalog__body">
							<div className="catalog__header">
								<h1 className="catalog__title">Men’s Clothing</h1>
								<ul className="catalog__type type-catalog">
									<li className="type-catalog__item">
										<button className="type-catalog__button type-catalog__button--active">New</button>
									</li>
									<li className="type-catalog__item">
										<button className="type-catalog__button">Recommended</button>
									</li>
								</ul>
							</div>
							<div className="catalog__items"></div>
						</div>
					</div>
				</section>
				<section className="catalog__description description-catalog">
					<div className="description-catalog__container">
						<h2 className="description-catalog__title title">Clothing for Women Online in India</h2>
						<div className="description-catalog__body">
							<h3>Reexplore Women's Clothing Collection Online at Euphoria</h3>
							<p>
								Women's Clothing – Are you <strong>searching</strong> for the best website to buy Clothing for
								Women online in India? Well, your search for the coolest and most stylish womens clothing ends
								here. From trendy Casual Womens Wear Online shopping to premium quality cotton women's
								apparel, Euphoria has closet of Women Collection covered with the latest and best designs of
								Women's Clothing Online.
							</p>
							<p>
								Our collection of clothes for women will make you the trendsetter with an iconic resemblance
								of choice in Womens Wear.
							</p>
							<h3>One-Stop Destination to Shop Every Clothing for Women: Euphoria</h3>
							<p>
								Today, Clothing for Women is gaining more <strong>popularity</strong> above all. This is
								because gone are the days when women were used to carrying uncomfortable fashion. Today, a
								lady looks prettier when she is in Casual Womens Wear which is a comfortable outfit.
								Concerning this, Euphoria has a big fat range of Stylish Women's Clothing that would make her
								the winner wherever she goes.
							</p>
							<p>
								Our collection of clothes for women will make you the trendsetter with an iconic resemblance
								of choice in Womens Wear. It is quite evident to say that there are very few Womens Clothing
								online stores where you can buy Western Wear for Women comprising the premium material and
								elegant design that you are always seeking for. Basically,
							</p>
						</div>
						<a href="#" className="description-catalog__see-more">
							See More
						</a>
					</div>
				</section>
				<section className="catalog__best-price best-price">
					<div className="best-price__container">
						<h2 className="best-price__title title">Buy Women's Clothing at Best Price</h2>
						<div className="best-price__table">
							<table className="table-best-price">
								<thead>
									<tr>
										<th>Women's Clothing</th>
										<th>Best Price</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Pick Any 4- Womens Plain T-shirt Combo</td>
										<td>₹1099</td>
									</tr>
									<tr>
										<td>Pick Any 4- Plain Womens Boxer Combo</td>
										<td>₹1099</td>
									</tr>
									<tr>
										<td>Pick Any 4 - Women Plain Full Sleeve T-shirt Combo</td>
										<td>₹1399</td>
									</tr>
									<tr>
										<td>Multicolor Checkered Long Casual Shirts for Women</td>
										<td>₹499</td>
									</tr>
									<tr>
										<td>Pick Any 2: Plain Boxy Casual Shirts for Women Combo</td>
										<td>₹799</td>
									</tr>
									<tr>
										<td>Blue Floral Anarkali Kurti</td>
										<td>₹599</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</section>
			</div>
		</>
	)
}

export default Products
