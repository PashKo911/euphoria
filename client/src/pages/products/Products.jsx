import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { GiSettingsKnobs } from 'react-icons/gi'
import { IoIosArrowUp } from 'react-icons/io'

import ColorsInput from '../../components/inputs/ColorsInput'
import SizeInput from '../../components/inputs/SizeInput'
import CategoryInput from '../../components/inputs/CategoryInput'
import SliderInput from '../../components/inputs/SliderInput'
import Accordion from '../../components/accordion/Accordion'

import useHttp from '../../hooks/useHttp'
import Product from '../../components/productCards/Product'
import Preloader from '../../components/preloader'

import './products.scss'

const Products = () => {
	const [products, setProducts] = useState([])
	const { get, process } = useHttp()

	const fetchProducts = async () => {
		try {
			const data = await get('/products')
			if (data) {
				setProducts(data.products || [])
			}
		} catch (error) {
			console.error('Error fetching products:', error)
		}
	}

	useEffect(() => {
		fetchProducts()
	}, [])

	const data = {
		topStyles: {
			title: 'Top Styles',
			items: [
				<CategoryInput title={'Tops'} key={'Tops'} />,
				<CategoryInput title={'Printed T-shirts'} key={'Printed'} />,
				<CategoryInput title={'Plain T-shirts'} key={'Plain'} />,
				<CategoryInput title={'Kurti'} key={'Kurti'} />,
			],
		},
		price: {
			title: 'Price',
			items: [<SliderInput key={uuid()} min={20} max={1000} />],
		},
		colors: {
			title: 'Colors',
			items: [
				<ColorsInput title={'Purple'} color={'#8434e1'} key={'#8434e1'} />,
				<ColorsInput title={'Black'} color={'#000000'} key={'#000000'} />,
				<ColorsInput title={'Red'} color={'#F35528'} key={'#F35528'} />,
				<ColorsInput title={'Orange'} color={'#F16F2B'} key={'#F16F2B'} />,
				<ColorsInput title={'Navy'} color={'#345EFF'} key={'#345EFF'} />,
			],
		},
		size: {
			title: 'Size',
			items: [
				<SizeInput title={'XXS'} key={'XXS'} />,
				<SizeInput title={'XS'} key={'XS'} />,
				<SizeInput title={'S'} key={'S'} />,
				<SizeInput title={'M'} key={'M'} />,
				<SizeInput title={'L'} key={'L'} />,
			],
		},
		style: {
			title: 'Dress Style',
			items: [
				<CategoryInput title={'Classic'} key={'Classic'} />,
				<CategoryInput title={'Casual'} key={'Casual'} />,
				<CategoryInput title={'Business'} key={'Business'} />,
			],
		},
	}

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
								<Accordion title={data.topStyles.title} items={data.topStyles.items} colCount={1} />
								<Accordion title={data.price.title} items={data.price.items} colCount={1} />
								<Accordion title={data.colors.title} items={data.colors.items} colCount={4} />
								<Accordion title={data.size.title} items={data.size.items} colCount={3} />
								<Accordion title={data.style.title} items={data.style.items} colCount={1} />
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
							{process === 'loading' && (
								<div className="message-block">
									<Preloader />
								</div>
							)}
							{process !== 'loading' && products.length === 0 && (
								<div className="message-block">No products available...</div>
							)}
							{process !== 'loading' && products.length > 0 && (
								<div className="catalog__items">
									{products.map((product) => (
										<Product
											key={product._id}
											title={product.title}
											price={product.price}
											path={product.path}
										/>
									))}
								</div>
							)}
						</div>
					</div>
				</section>
			</div>
		</>
	)
}

export default Products
