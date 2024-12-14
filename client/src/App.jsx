import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/home/Home'
import Products from './pages/products/Products'
import Auth from './pages/auth/Auth'

import './App.scss'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="home" element={<Home />} />
					<Route path="products/men" element={<Products />} />
					<Route path="auth" element={<Auth />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
