import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import UserManager from '../models/userManager'

export default new LocalStrategy(
	{ usernameField: 'email', passwordField: 'password' },
	async (email, password, done) => {
		try {
			// const user = await UserManager.getOne({ email }, {}, ['type'])
			const user = await UserManager.getOne({ email })
			if (!user) {
				return done(null, false, { message: 'Incorrect email or password' })
			}

			const isPasswordCorrect = await bcrypt.compare(password, user.password)
			if (!isPasswordCorrect) {
				return done(null, false, { message: 'Incorrect email or password' })
			}

			return done(null, user)
		} catch (error) {
			return done(error)
		}
	}
)
