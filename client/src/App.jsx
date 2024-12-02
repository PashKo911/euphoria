import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './components/pages/home/Home'
import Products from './components/pages/products/Products'

import './App.scss'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="home" element={<Home />} />
					<Route path="products" element={<Products />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
