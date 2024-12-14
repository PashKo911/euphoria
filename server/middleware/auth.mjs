// import { parseBearer } from '../utils/jwtHelpers.mjs'

export function ensureAuthenticated(req, res, next) {
	passport.authenticate('jwt', { session: false }, (err, user, info) => {
		if (err || !user) {
			return res.status(401).json({ message: 'Unauthorized' })
		}
		req.user = user
		return next()
	})(req, res, next)
}

/*
// Функція для налаштування аутентифікації та авторизації
const auth = (app) => {
	// Middleware для налаштування заголовків CORS
	app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*')
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept, Authorization'
		)
		res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
		next() // Передача обробки наступному middleware
	})

	// Middleware для перевірки аутентифікації та авторизації
	app.use((req, res, next) => {
		// Відкриті шляхи, які не потребують авторизації
		const openPathes = ['/api/v1/auth/login', '/api/v1/auth/signup', '/api/v1/products']

		console.log(req.path)

		if (req.path.startsWith('/images')) {
			return next()
		}
		// Перевірка, чи шлях потребує авторизації
		if (!openPathes.includes(req.path)) {
			try {
				// Парсинг токена та додавання користувача до запиту
				req.user = parseBearer(req.headers.authorization, req.headers)
			} catch (err) {
				// Якщо авторизація не вдалася, повертається статус 401
				return res.status(401).json({ result: 'Access Denied' })
			}
		}
		next() // Передача обробки наступному middleware
	})
}
*/
// Експорт функції auth як модуля за замовчуванням
// export default auth
