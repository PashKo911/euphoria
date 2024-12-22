import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import config from '../config/default.mjs'
import UsersDBService from '../src/v1/models/user/UsersDBService.mjs'

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.tokenKey,
}

export default new JWTStrategy(options, async (jwtPayload, done) => {
	try {
		const user = await UsersDBService.getById(jwtPayload._id, { password: 0 })
		if (!user) {
			return done(null, false, { message: 'User not found' })
		}

		return done(null, user)
	} catch (error) {
		return done(error, false)
	}
})
