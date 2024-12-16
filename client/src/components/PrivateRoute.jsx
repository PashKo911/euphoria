import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({ children }) => {
	const { isAuthenticated } = useAuth()

	return isAuthenticated ? children : <Navigate to="/auth" />
}

export default PrivateRoute

import PrivateRoute from './components/PrivateRoute'
/*
function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="home" element={<Home />} />
                        <Route
                            path="products/men"
                            element={
                                <PrivateRoute>
                                    <Products />
                                </PrivateRoute>
                            }
                        />
                        <Route path="auth" element={<Auth />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
*/
