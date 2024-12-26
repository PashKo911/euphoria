import React, { useEffect, useState } from 'react'

import useHttp from '../../hooks/useHttp'
import Product from '../../components/productCards/Product'
import FilterSort from '../../components/filters/FilterSort'
import ProcessMessage from '../../components/process/ProcessMessage'

import './products.scss'
import Filter from '../../components/filters/Filter'

const Products = () => {
	const [products, setProducts] = useState([])
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const { get, process } = useHttp()
	console.log(products)

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

	return (
		<>
			<div className="page__catalog catalog">
				<section className="catalog__main">
					<div className="catalog__container">
						<Filter isFilterOpen={isFilterOpen} callback={setIsFilterOpen} />
						<div className="catalog__body">
							<div className="catalog__header">
								<h1 className="catalog__title">Men’s Clothing</h1>
								<FilterSort isFilterOpen={isFilterOpen} callback={setIsFilterOpen} />
							</div>
							<ProcessMessage process={process} items={products} />

							<div className="catalog__items">
								{products.map((product) => (
									<Product
										key={product._id}
										title={product.title}
										price={product.price}
										path={product.paths[0]}
									/>
								))}
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	)
}

export default Products
