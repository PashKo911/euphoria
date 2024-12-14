import RequestManager from '../services/RequestManager.js'

class LoginApiManager {
	static async login(data, callback) {
		return RequestManager.doPostRequest('/auth/login', data, '/products/men', callback, false)
	}
	static async signup(data, callback) {
		return RequestManager.doPostRequest('/auth/signup', data, '/products/men', callback, false)
	}
}

export default LoginApiManager
