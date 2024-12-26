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
import './App.scss'

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route path="home" element={<Home />} />
						<Route path="products/men" element={<Products />} />
						<Route path="auth/sign-in" element={<SignIn />} />
						<Route path="auth/sign-up" element={<SignUp />} />
						<Route path="dashboard" element={<Dashboard />}>
							<Route path="products" element={<ProductsTable />} />
							<Route path="users" element={<UsersTable />} />
							<Route path="users/add" element={<UserForm />} />
							<Route path="products/add" element={<ProductForm />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
