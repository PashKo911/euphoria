import session from 'express-session'
import config from './default.mjs'

const sessionConfig = session({
	secret: config.secretKey,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false, // Для разработки false, для продакшн должно быть true, если работает по HTTPS
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24,
	},
})

export default sessionConfig
