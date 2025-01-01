// components/Layout.js
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { useSyncFiltersWithURL } from '../../hooks/useSyncFiltersWithURL'

const Layout = () => {
	useSyncFiltersWithURL()
	return (
		<>
			<Navbar />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}

export default Layout
