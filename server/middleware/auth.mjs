import { parseBearer } from '../utils/jwtHelpers.mjs'
import checkUserPermissions from '../utils/checkUserPermissions.mjs'

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
	app.use(async (req, res, next) => {
		// Відкриті шляхи, які не потребують авторизації
		const closedPathes = ['/dashboard']

		console.log(closedPathes.some((path) => req.path.includes(path)))

		// Перевірка, чи шлях потребує авторизації
		if (closedPathes.some((path) => req.path.includes(path))) {
			try {
				// Парсинг токена та додавання користувача до запиту
				const user = parseBearer(req.headers.authorization, req.headers)
				if (!user) {
					return res.status(401).json({ result: 'Access Denied' })
				}

				const hasAccess = await checkUserPermissions(user.id, req.path)
				if (!hasAccess) {
					return res.status(403).json({ result: 'Forbidden' })
				}

				req.user = user
			} catch (err) {
				return res.status(401).json({ result: 'Access Denied' })
			}
		}

		next() // Передача обробки наступному middleware
	})
}

// Експорт функції auth як модуля за замовчуванням
export default auth
