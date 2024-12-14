import jwt from 'jsonwebtoken'
import config from '../config/default.mjs'

function prepareSecret(headers) {
	return config.tokenKey + headers['user-agent'] + headers['accept-language']
}

export function prepareToken(data, headers) {
	return jwt.sign(data, prepareSecret(headers), {
		expiresIn: '12h',
	})
}
