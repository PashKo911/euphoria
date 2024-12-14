import { validationResult } from 'express-validator'
import FormatValidationErrors from '../../../validators/formatValidationErrors.mjs'

import UsersDBService from '../models/user/UsersDBService.mjs'

class UserController {
	static async usersList(req, res) {
		try {
			const filters = {}
			for (const key in req.query) {
				if (req.query[key]) filters[key] = req.query[key]
			}

			const dataList = await UsersDBService.getList(filters)
			res.status(200).json({
				users: dataList,
				user: req.user,
			})
		} catch (err) {
			res.status(500).json({ error: err.message })
		}
	}

	static async getUser(req, res) {
		try {
			const id = req.params.id
			const user = await UsersDBService.getById(id)
			res.status(200).json(user)
		} catch (error) {
			res.status(500).json({ error: 'Error fetching products' })
		}
	}

	static async registerUser(req, res) {
		const expressErrors = validationResult(req)

		if (!expressErrors.isEmpty()) {
			const errors = FormatValidationErrors.formatExpressErrors(expressErrors)
			return res.status(400).json({ errors })
		}

		try {
			const dataObj = req.body

			if (req.params.id) {
				await UsersDBService.update(req.params.id, dataObj)
			} else {
				await UsersDBService.create(dataObj)
			}

			res.status(200).json({ message: 'User registered successfully' })
		} catch (error) {
			const errors = FormatValidationErrors.formatMongooseErrors(error.message, 'User')
			res.status(400).json({ errors })
		}
	}

	static async deleteUser(req, res) {
		try {
			await UsersDBService.deleteById(req.body.id)
			res.status(200).json({ success: true })
		} catch (error) {
			res.status(500).json({ success: false, message: 'Failed to delete user' })
		}
	}
}

export default UserController
