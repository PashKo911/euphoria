const API_VERSION = 'v1'
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export default Object.freeze({
	API_BASE,
	PUBLIC_IMAGES: `${API_BASE}/images`,
	API_URL: `${API_BASE}/api/${API_VERSION}`,
	HEALTHCHECK_URL: `${API_BASE}/api/${API_VERSION}/health`,
})
