import React, { useEffect, useState } from 'react'
import { useFilter } from '../../context/FilterProvider'

import useHttp from '../../hooks/useHttp'
import Product from '../../components/productCards/Product'
import FilterSort from '../../components/filters/FilterSort'
import ProcessMessage from '../../components/process/ProcessMessage'
import Pagination from '../../components/pagination/Pagination'
import Filter from '../../components/filters/Filter'

import './products.scss'

const Products = () => {
	const { state, dispatch } = useFilter()
	const [products, setProducts] = useState([])
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const [filterOptions, setFilterOptions] = useState({})
	const [productsCount, setProductsCount] = useState(null)
	const { get, process } = useHttp()

	useEffect(() => {
		const fetchFilterOptions = async () => {
			try {
				const data = await get('/products/options')
				setFilterOptions(data)
			} catch (error) {
				console.error('Error fetching filters:', error)
			}
		}
		fetchFilterOptions()
	}, [])

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const query = new URLSearchParams(state).toString()
				const data = await get(`/products?${query}`)
				const { documents, count } = data?.products
				setProducts(documents || [])
				setProductsCount(Number(count) || null)
			} catch (error) {
				console.error('Error fetching products:', error)
			}
		}
		fetchProducts()
	}, [state])

	return (
		<div className="page__catalog catalog">
			<section className="catalog__main">
				<div className="catalog__container">
					<Filter options={filterOptions} isFilterOpen={isFilterOpen} callback={setIsFilterOpen} />
					<div className="catalog__body">
						<div className="catalog__header">
							<h1 className="catalog__title">Men’s Clothing</h1>
							<FilterSort isFilterOpen={isFilterOpen} callback={setIsFilterOpen} />
						</div>
						<ProcessMessage process={process} items={products} />

						<div className="catalog__items">
							{products.map((product) => (
								<Product key={product._id} product={product} />
							))}
						</div>
						<Pagination productsCount={productsCount} />
					</div>
				</div>
			</section>
		</div>
	)
}

export default Products
