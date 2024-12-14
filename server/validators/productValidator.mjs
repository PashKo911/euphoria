import { checkSchema } from 'express-validator'

class ProductValidator {
	static productSchema = {
		title: {
			trim: true,
			notEmpty: {
				errorMessage: 'Title is required',
			},
			isLength: {
				options: { min: 3, max: 100 },
				errorMessage: 'Title must be between 3 and 100 characters long',
			},
			escape: true,
		},
		price: {
			notEmpty: {
				errorMessage: 'Price is required',
			},
			isFloat: {
				options: { min: 0 },
				errorMessage: 'Price must be a positive number',
			},
			toFloat: true,
		},
		description: {
			optional: true, // Поле не обязательно
			trim: true,
			isLength: {
				options: { max: 500 },
				errorMessage: 'Description must not exceed 500 characters',
			},
			escape: true,
		},
		// image: {
		// 	optional: true, // Поле не обязательно
		// 	isString: {
		// 		errorMessage: 'Image must be a valid string',
		// 	},
		// 	matches: {
		// 		options: [/^data:image\/(jpeg|png|gif|bmp);base64,/],
		// 		errorMessage: 'Image must be a valid base64 string in JPEG, PNG, GIF, or BMP format',
		// 	},
		// },
	}
}

export default ProductValidator
