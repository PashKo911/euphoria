import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import FormatValidationErrors from '../../../validators/formatValidationErrors.mjs'
import UsersDBService from '../models/user/UsersDBService.mjs'
import { prepareToken } from '../../../utils/jwtHelpers.mjs'

class AuthController {
	static async signup(req, res) {
		const newUser = req.body
		const expressErrors = validationResult(req)

		if (!expressErrors.isEmpty()) {
			const errors = FormatValidationErrors.formatExpressErrors(expressErrors)
			return res.status(400).json({ errors })
		}

		try {
			if (req.session.guestId) {
				const guest = await UsersDBService.getById(req.session.guestId)
				if (!guest) {
					return res.status(404).json({ message: 'Guest user not found' })
				}

				const hashedPassword = await bcrypt.hash(newUser.password, 10)
				newUser.password = hashedPassword

				newUser.cart = guest.cart

				const user = await UsersDBService.create(newUser)

				await UsersDBService.deleteById(guest._id)

				const token = prepareToken(
					{
						_id: user._id,
						username: user.name,
					},
					req.headers
				)

				return res.status(201).json({
					result: 'Signed up successfully',
					token,
					user: req.user,
				})
			}
		} catch (error) {
			const errors = FormatValidationErrors.formatMongooseErrors(error.message, 'User')
			console.error(error)
			res.status(400).json({ errors })
		}
	}

	static async login(req, res) {
		const expressErrors = validationResult(req)

		if (!expressErrors.isEmpty()) {
			const errors = FormatValidationErrors.formatExpressErrors(expressErrors)
			return res.status(400).json({ errors })
		}

		try {
			const user = await UsersDBService.findOne({ email: req.body.email })

			if (!user) {
				return res.status(401).json({ errors: [{ message: 'Invalid email or password' }] })
			}

			const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
			if (!isPasswordCorrect) {
				return res.status(401).json({ errors: [{ message: 'Invalid email or password' }] })
			}

			if (req.session.guestId) {
				const guest = await UsersDBService.getById(req.session.guestId)
				if (guest) {
					await UsersDBService.deleteById(guest._id)
				}
				// delete req.session.guestId
			}

			const token = prepareToken(
				{
					_id: user._id,
					username: user.username,
				},
				req.headers
			)

			res.json({
				result: 'Authorized',
				token,
				user: req.user,
			})
		} catch (error) {
			const errors = FormatValidationErrors.formatMongooseErrors(error.message, 'User')
			res.status(401).json({ errors })
		}
	}

	static async logout(req, res) {
		try {
			req.session.destroy((err) => {
				if (err) {
					return res.status(500).json({ message: 'Error during logout' })
				}

				res.clearCookie('connect.sid')
				res.status(200).json({ message: 'Logout successful' })
			})
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: 'Error during logout' })
		}
	}
}

export default AuthController
