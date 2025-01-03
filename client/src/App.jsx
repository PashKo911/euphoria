import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import ProductDetail from './pages/products/ProductDetail'
import './App.scss'
import { FilterProvider } from './context/FilterProvider'

function App() {
	return (
		<AuthProvider>
			<FilterProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route path="home" element={<Home />} />

							<Route path="products" element={<Products />} />
							<Route path="products/detail/:id" element={<ProductDetail />} />

							<Route path="auth/sign-in" element={<SignIn />} />
							<Route path="auth/sign-up" element={<SignUp />} />

							<Route path="dashboard" element={<Dashboard />}>
								<Route path="products" element={<ProductsTable />} />
								<Route path="users" element={<UsersTable />} />
								<Route path="users/add" element={<UserForm />} />
								<Route path="products/add/:id?" element={<ProductForm />} />
							</Route>
						</Route>
					</Routes>
				</BrowserRouter>
			</FilterProvider>
		</AuthProvider>
	)
}

export default App
