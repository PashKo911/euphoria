import mongoose from 'mongoose'
import config from '../../config/default.mjs'

const countrySchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Country name is required'],
		trim: true,
		minlength: [3, 'Country name must be at least 3 characters long'],
		maxlength: [50, 'Country name must be at most 50 characters long'],
		validate: {
			validator: function (v) {
				return /^[A-Za-z\s]+$/.test(v)
			},
			message: 'Country name should contain only letters and spaces',
		},
	},
})

countrySchema.statics.checkDatabaseExists = async () => {
	const databases = await mongoose.connection.listDatabases()
	return databases.databases.some((db) => db.name === config.databaseName)
}
countrySchema.statics.checkCollectionExists = async function () {
	if (await this.checkDatabaseExists()) {
		const collections = await mongoose.connection.db.listCollections({ name: 'countries' }).toArray()
		return collections.length > 0
	}
	return false
}

const Country = mongoose.model('Country', countrySchema)

export default Country
