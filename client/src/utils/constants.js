const API_VERSION = 'v1'
const REACT_APP_API_BASE = 'https://euphoria-doaq.onrender.com'
const API_BASE = REACT_APP_API_BASE || 'http://localhost:3000'

export default Object.freeze({
	API_BASE,
	PUBLIC_IMAGES: `${API_BASE}/images`,
	API_URL: `${API_BASE}/api/${API_VERSION}`,
})
