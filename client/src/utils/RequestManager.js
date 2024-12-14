import constants from '../utils/constants.js'

class RequestManager {
	// Базовий URL для API запитів
	static apiBase = constants.API_URL

	// Метод для отримання повного маршруту до сервера
	static getServerRoute(path) {
		return `${RequestManager.apiBase}${path}`
	}

	// Метод для перевірки автентифікації користувача
	static isAuthenticated() {
		return localStorage.getItem('jwt_token')
	}

	static protectRoute(loginRoute = '../auth/login.html') {
		if (!this.isAuthenticated()) {
			window.location.href = loginRoute
		}
	}

	// Метод для виходу користувача
	static async onLogout() {
		try {
			// Видаляємо токен з localStorage
			localStorage.removeItem('jwt_token')
			// Оновлюємо сторінку після виходу
			location.reload()
		} catch (error) {
			console.error('Error during logout:', error)
		}
	}

	// static async handleResponse(response) {
	// 	const data = await response.json()
	// 	if (!response.ok) {
	// 		throw data.errors
	// 	}
	// 	return data
	// }

	// Метод для виконання POST запиту
	static async doPostRequest(url, data, redirectRoute, callback, addAuthorization = true) {
		const headers = { 'Content-Type': 'application/json' }
		if (addAuthorization && this.isAuthenticated()) {
			headers['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`
		}

		const response = await fetch(this.getServerRoute(url), {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(data),
		})

		const result = await response.json()

		if (response.ok) {
			if (callback) {
				callback(result)
			}
			// window.location.href = redirectRoute
		} else {
			console.log(result.errors)
			throw result.errors
		}
	}

	// Метод для відображення помилок
	// static showErrors(errors, errorsContainerSelector = '#errors') {
	// 	let errorsContainer = document.querySelector(errorsContainerSelector)
	// 	if (!errorsContainer) {
	// 		// Якщо контейнер для помилок не існує, створюємо його
	// 		errorsContainer = document.createElement('div')
	// 		errorsContainer.id = errorsContainerSelector.replace('#', '')
	// 		document.body.append(errorsContainer)
	// 	}
	// 	errorsContainer.innerHTML = ''
	// 	errors.forEach((error) => {
	// 		const errorMessage = document.createElement('div')
	// 		errorMessage.classList.add('error-message')
	// 		errorMessage.textContent = error.message
	// 		errorsContainer.append(errorMessage)
	// 	})
	// }

	// Метод для виконання POST запиту з даними форми
	static async postFormRequest(url, form, redirectPage, addAuthorization = true) {
		const headers = {}
		if (addAuthorization && RequestManager.isAuthenticated()) {
			headers['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`
		}
		const formData = new FormData(form)

		const response = await fetch(this.getServerRoute(url), {
			method: 'POST',
			headers: headers,
			body: formData,
		})
		const data = await response.json()

		// Обробка успішного запиту
		if (response.ok) {
			window.location.href = redirectPage
		} else {
			const result = await response.json()
			this.showErrors(result.errors)
		}

		return data
	}

	// Загальний метод для виконання POST запиту
	static async postRequest(route, body, addAuthorization = true) {
		const headers = { 'Content-Type': 'application/json' }
		if (addAuthorization && RequestManager.isAuthenticated()) {
			headers['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`
		}

		const response = await fetch(this.getServerRoute(route), {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(body),
		})
		const data = await response.json()
		return data
	}

	// Метод для виконання DELETE запиту
	static async deleteRequest(route, id, addAuthorization = true) {
		const headers = { 'Content-Type': 'application/json' }
		if (addAuthorization && RequestManager.isAuthenticated()) {
			headers['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`
		}

		const response = await fetch(this.getServerRoute(route), {
			method: 'DELETE',
			headers: headers,
			body: JSON.stringify({ id }),
		})
		const data = await response.json()
		window.location.reload(true)
		return data
	}

	// Метод для обробки вибору файлу
	static handleFileSelect(event, imgSelector) {
		const file = event.target.files[0]
		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader()
			reader.onload = function (e) {
				const imgElement = document.querySelector(imgSelector)
				imgElement.src = e.target.result
			}
			reader.readAsDataURL(file)
		}
	}

	// Метод для виконання GET запиту
	static async fetchData(url, addAuthorization = true) {
		let response
		try {
			const headers = { 'Content-Type': 'application/json' }
			if (addAuthorization && RequestManager.isAuthenticated()) {
				headers['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`
			}

			response = await fetch(this.getServerRoute(url), {
				method: 'GET',
				headers: headers,
			})

			if (response.ok) {
				const data = await response.json()
				return data
			} else {
				// const result = await response.json()
				return null
			}
		} catch (error) {
			console.error('Error:', error)
			return null
		}
	}
}

export default RequestManager
