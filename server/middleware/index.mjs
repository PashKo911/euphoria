import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from '../config/passport.mjs'
import { initializeGuest } from './initializeGuest.mjs'
import path from 'path'
import { fileURLToPath } from 'url'
import loggerConfig from '../config/logger.mjs'
import sessionConfig from '../config/session.mjs'
import settings from '../config/default.mjs'

// Визначення поточного файлу і директорії
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const middleware = (app) => {
	// Middleware для підтримки CORS
	app.use(
		cors({
			origin: settings.frontendUrl,
			credentials: true,
		})
	)

	// Добавляем __dirname в объект req
	app.use((req, res, next) => {
		req.__dirname = __dirname
		next()
	})

	// Middleware для логування запитів
	app.use(loggerConfig)

	// Middleware для парсингу JSON запитів
	app.use(express.json())

	// Middleware для парсингу URL-кодованих даних
	app.use(express.urlencoded({ extended: false }))

	// Middleware для парсингу cookies
	app.use(cookieParser())

	// Middleware для обробки статичних файлів
	app.use(express.static(path.join(__dirname, '../public')))

	// Настройка passport
	app.use(passport.initialize())

	// Middleware для налаштування сесій
	app.use(sessionConfig)

	app.use(passport.session())

	// Ініціалізація користувача
	app.use(initializeGuest)
}

export default middleware
