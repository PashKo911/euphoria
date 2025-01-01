import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import useHttp from '../../hooks/useHttp'
import Product from '../../components/productCards/Product'
import FilterSort from '../../components/filters/FilterSort'
import ProcessMessage from '../../components/process/ProcessMessage'
import Pagination from '../../components/pagination/Pagination'
import Filter from '../../components/filters/Filter'

import './products.scss'

const Products = () => {
	const [products, setProducts] = useState([])
	const [filters, setFilters] = useState({})
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const [filterOptions, setFilterOptions] = useState({})
	const [searchParams, setSearchParams] = useSearchParams()
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
				const query = new URLSearchParams(filters).toString()
				const data = await get(`/products?${query}`)
				setProducts(data.products || [])
			} catch (error) {
				console.error('Error fetching products:', error)
			}
		}
		fetchProducts()
	}, [filters])

	const totalPages = Math.ceil(products.length / 10)
	const currentPage = Number(searchParams.get('page') || 1)

	const handlePageChange = (page) => {
		setSearchParams({ ...Object.fromEntries(searchParams.entries()), page })
	}

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
						<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
					</div>
				</div>
			</section>
		</div>
	)
}

export default Products
