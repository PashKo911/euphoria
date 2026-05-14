import { parseBearer } from '../utils/jwtHelpers.mjs'
import checkUserPermissions from '../utils/checkUserPermissions.mjs'

// Функція для налаштування аутентифікації та авторизації
const auth = (app) => {
	// Middleware для перевірки аутентифікації та авторизації
	app.use(async (req, res, next) => {
		// Закриті шляхи
		const closedPathes = ['/dashboard']
		const guestId = req.headers['x-guest-id']
		const isClosedPath = closedPathes.some((path) => req.path.includes(path))

		let user = null
		if (guestId) {
			req.user = { id: guestId }
		}

		if (!guestId && req.headers.authorization) {
			try {
				// Парсинг токена та додавання користувача до запиту
				user = parseBearer(req.headers.authorization, req.headers)
				req.user = user
			} catch (err) {
				if (isClosedPath) {
					return res.status(401).json({ errors: [{ message: 'Invalid or expired token' }] })
				}
			}
		}

		if (isClosedPath) {
			try {
				if (!user?.id) {
					return res.status(401).json({ errors: [{ message: 'Authentication required' }] })
				}

				const hasAccess = await checkUserPermissions(user.id, req.path)
				if (!hasAccess) {
					return res.status(403).json({ errors: [{ message: 'Forbidden' }] })
				}
			} catch (err) {
				return res.status(401).json({ errors: [{ message: 'Access denied' }] })
			}
		}

		next() // Передача обробки наступному middleware
	})
}

// Експорт функції auth як модуля за замовчуванням
export default auth
