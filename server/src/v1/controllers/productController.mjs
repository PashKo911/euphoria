import { validationResult } from 'express-validator'
import FormatValidationErrors from '../../../validators/formatValidationErrors.mjs'

import ProductsDBService from '../models/product/ProductsDBService.mjs'

class ProductController {
	// Метод для отримання всіх товарів
	static async getAllProducts(req, res) {
		try {
			const filters = {}
			for (const key in req.query) {
				if (req.query[key]) filters[key] = req.query[key]
			}

			const productsList = await ProductsDBService.getList(filters)
			res.status(200).json({
				products: productsList,
				user: req.user,
			})
		} catch (error) {
			res.status(500).json({ error: 'Error fetching products' })
		}
	}

	static async getProduct(req, res) {
		try {
			const id = req.params.id
			const product = await ProductsDBService.getById(id)
			res.status(200).json(product)
		} catch (error) {
			res.status(500).json({ error: 'Error fetching products' })
		}
	}

	static async registerProduct(req, res) {
		const expressErrors = validationResult(req)

		if (!req.user) {
			return res.status(403).json({ error: 'Access denied' })
		}

		if (!expressErrors.isEmpty()) {
			const errors = FormatValidationErrors.formatExpressErrors(expressErrors)
			return res.status(400).json({ errors })
		}

		try {
			const productData = {
				...req.body,
			}
			if (req.file?.buffer) {
				productData.image = req.file.buffer.toString('base64')
			}

			if (req.params.id) {
				await ProductsDBService.update(req.params.id, productData)
			} else {
				await ProductsDBService.create(productData)
			}

			res.status(200).json({ message: 'Product registered successfully' })
		} catch (error) {
			const errors = FormatValidationErrors.formatMongooseErrors(error.message, 'Product')
			res.status(400).json({ errors })
		}
	}

	// Метод для видалення товару (доступний тільки для адміністратора)
	static async deleteProduct(req, res) {
		if (!req.user) {
			return res.status(403).json({ error: 'Access denied' })
		}

		try {
			await ProductsDBService.deleteById(req.body.id)
			res.status(200).json({ message: 'Product deleted' })
		} catch (error) {
			res.status(500).json({ error: 'Error deleting product' })
		}
	}
}

export default ProductController
