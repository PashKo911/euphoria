import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/home/Home'
import Products from './pages/products/Products'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Dashboard from './pages/dashboard/Dashboard'
import ProductsTable from './components/tables/ProductsTable'
import UsersTable from './components/tables/UsersTable'
import ProductForm from './pages/forms/ProductForm'
import UserForm from './pages/forms/UserForm'
import { AuthProvider } from './context/AuthContext'
import { FilterProvider } from './context/FilterProvider'
import { CartProvider } from './context/CartContext'
import ProductDetail from './pages/products/ProductDetail'
import NotFound from './pages/notFound/NotFound'

import './App.scss'
import Cart from './pages/cart/Cart'

function App() {
	return (
		<CartProvider>
			<AuthProvider>
				<FilterProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Layout />}>
								<Route index element={<Home />} />

								<Route path="products" element={<Products />} />
								<Route path="products/detail/:id" element={<ProductDetail />} />

								<Route path="cart" element={<Cart />} />

								<Route path="auth/sign-in" element={<SignIn />} />
								<Route path="auth/sign-up" element={<SignUp />} />

								<Route path="dashboard" element={<Dashboard />}>
									<Route path="products" element={<ProductsTable />} />
									<Route path="users" element={<UsersTable />} />
									<Route path="users/add" element={<UserForm />} />
									<Route path="products/add/:id?" element={<ProductForm />} />
								</Route>
								<Route path="*" element={<NotFound />} />
							</Route>
						</Routes>
					</BrowserRouter>
				</FilterProvider>
			</AuthProvider>
		</CartProvider>
	)
}

export default App
