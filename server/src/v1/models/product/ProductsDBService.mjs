import Product from './Product.mjs'
import MongooseCRUDManager from '../MongooseCRUDManager.mjs'

class ProductsDBService extends MongooseCRUDManager {
	async getList(filters) {
		try {
			const res = await super.getList(filters, { title: 1, price: 1, count: 1, paths: 1 })
			return res
		} catch (error) {
			console.error(error)
			return []
		}
	}
	async getById(id) {
		try {
			const res = await super.getById(id, {}, ['colors', 'dressStyle', 'gender', 'sizes'])
			return res
		} catch (error) {
			throw new Error('Error finding data by id: ' + error.message)
		}
	}
}

export default new ProductsDBService(Product)
