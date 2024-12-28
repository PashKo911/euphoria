import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RiEditLine, RiDeleteBinLine } from 'react-icons/ri'
import ProcessMessage from '../process/ProcessMessage'

import constants from '../../utils/constants'
import useHttp from '../../hooks/useHttp'

import styles from './table.module.scss'

const ProductsTable = () => {
	const [products, setProducts] = useState([])
	const { get, del, process } = useHttp()

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

	const deleteHandler = async (id) => {
		const previousProducts = [...products]

		setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id))

		try {
			await del('/products/delete', id)
		} catch (error) {
			console.error('Error deleting user:', error)
			setProducts(previousProducts)
		}
	}

	useEffect(() => {
		fetchProducts()
	}, [])

	return (
		<>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>Product Details</th>
						<th>Price</th>
						<th>Count</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product._id}>
							<td className={styles.details}>
								<img src={`${constants.API_BASE}${product.paths[0]}`} alt={product.title} />
								<div className={styles.detailsContent}>
									<h3 className={styles.detailsTitle}>{product.title}</h3>
								</div>
							</td>
							<td>{product.price}</td>
							<td>{product.count || 3}</td>
							<td>
								<div className={styles.actions}>
									<Link to={`add/${product._id}`} type="button">
										<RiEditLine size={20} />
									</Link>
									<button type="button" onClick={() => deleteHandler(product._id)}>
										<RiDeleteBinLine size={20} />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<ProcessMessage process={process} items={products} />
		</>
	)
}

export default ProductsTable
