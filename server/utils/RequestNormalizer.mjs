import mongoose from 'mongoose'

class RequestNormalizer {
	static normalizeStringField(field) {
		if (!field) return null

		if (field.startsWith('[')) {
			try {
				const parsedArray = JSON.parse(field)
				return RequestNormalizer.normalizeArrayField(parsedArray)
			} catch (error) {
				console.error('Error parsing JSON string:', error)
				return null
			}
		}

		if (mongoose.Types.ObjectId.isValid(field)) {
			return new mongoose.Types.ObjectId(field)
		}

		return field
	}

	static normalizeArrayField(field) {
		if (!Array.isArray(field)) return field

		return field
			.map((item) => (mongoose.Types.ObjectId.isValid(item) ? new mongoose.Types.ObjectId(item) : null))
			.filter((item) => item !== null)
	}

	static normalizeField(field) {
		if (typeof field === 'string') {
			return RequestNormalizer.normalizeStringField(field)
		}

		if (Array.isArray(field)) {
			return RequestNormalizer.normalizeArrayField(field)
		}

		return field
	}

	static middleware(req, res, next) {
		req.category
		try {
			for (const [key, value] of Object.entries(req.body)) {
				req.body[key] = RequestNormalizer.normalizeField(value)
			}

			if (req.files && req.files.length > 0) {
				req.body.paths = req.files.map((file) => `/images/products/${req.category}/${file.filename}`)
			} else {
				req.body.paths = []
			}

			next()
		} catch (error) {
			console.error('Error in request normalization middleware:', error)
			res.status(400).json({ error: 'Invalid request data' })
		}
	}
}

export default RequestNormalizer
