import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/home/Home'
import Products from './pages/products/Products'
import Auth from './pages/auth/Auth'

import { AuthProvider } from './context/AuthContext'

import './App.scss'

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route path="home" element={<Home />} />
						<Route path="products/men" element={<Products />} />
						<Route path="auth" element={<Auth />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
