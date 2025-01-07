import React, { useEffect, useState } from 'react'
import { useFilter } from '../../context/FilterProvider'
import { useSyncFiltersWithURL } from '../../hooks/useSyncFiltersWithURL'
import useHttp from '../../hooks/useHttp'
import Product from '../../components/productCards/Product'
import FilterSort from '../../components/filters/FilterSort'
import ClearFilterBlock from '../../components/filters/ClearFilterBlock'
import { useLocation } from 'react-router-dom'
import ProcessMessage from '../../components/process/ProcessMessage'
import Pagination from '../../components/pagination/Pagination'
import Filter from '../../components/filters/Filter'

import './products.scss'

const Products = () => {
	useSyncFiltersWithURL()
	const { state, dispatch } = useFilter()
	const [products, setProducts] = useState([])
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const [filterOptions, setFilterOptions] = useState({})
	const [productsCount, setProductsCount] = useState(null)
	const location = useLocation()
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
				if (!filterOptions.genders) return

				const query = new URLSearchParams(state)
				const gender = query.get('gender')
				const genderId = filterOptions.genders.find((item) => item.label === gender)?._id || null

				if (genderId) {
					query.set('gender', genderId)
				}

				const data = await get(`/products?${query.toString()}`)
				const { documents, count } = data?.products
				setProducts(documents || [])
				setProductsCount(Number(count) || null)
			} catch (error) {
				console.error('Error fetching products:', error)
			}
		}
		fetchProducts()
	}, [state, filterOptions])

	useEffect(() => {
		return () => {
			dispatch({ type: 'CLEAR_FILTER', payload: { key: 'gender' } })
		}
	}, [location.pathname])
	return (
		<div className="page__catalog catalog">
			<section className="catalog__main">
				<div className="catalog__container">
					<Filter options={filterOptions} isFilterOpen={isFilterOpen} callback={setIsFilterOpen} />
					<div className="catalog__body">
						<div className="catalog__header">
							<div className="catalog__top">
								<h1 className="catalog__title">{`${state.gender}'s`} Clothing</h1>
								<FilterSort isFilterOpen={isFilterOpen} callback={setIsFilterOpen} />
							</div>
							<ClearFilterBlock state={state} filterOptions={filterOptions} dispatch={dispatch} />
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
