import Country from './Country.mjs'

class CountryDBService {
	static async getList() {
		try {
			const exists = await Country.checkCollectionExists()
			if (exists) {
				const data = Country.find().exec()
				return data
			}
			return []
		} catch (error) {
			console.error('Failed to load Countries list from database:', error.message)
			return []
		}
	}
}

export default CountryDBService
