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
		colors: {
			isArray: {
				errorMessage: 'Colors must be an array',
			},
			// Валидация для элементов массива (если необходимо)
			custom: {
				options: (value) => Array.isArray(value) && value.length > 0,
				errorMessage: 'At least one color is required',
			},
		},
		sizes: {
			isArray: {
				errorMessage: 'Sizes must be an array',
			},
			// Валидация для элементов массива (если необходимо)
			custom: {
				options: (value) => Array.isArray(value) && value.length > 0,
				errorMessage: 'At least one size is required',
			},
		},
		dressStyle: {
			notEmpty: {
				errorMessage: 'Dress style is required',
			},
			isMongoId: {
				errorMessage: 'Invalid dress style ID',
			},
		},
		gender: {
			notEmpty: {
				errorMessage: 'Gender is required',
			},
			isMongoId: {
				errorMessage: 'Invalid gender ID',
			},
		},
	}
}

export default ProductValidator
