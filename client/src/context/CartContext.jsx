import { createContext, useState, useContext, useEffect } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([])

	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem('cart')) || []
		setCart(storedCart)
	}, [])

	const syncCart = (newCart) => {
		setCart(newCart)
		localStorage.setItem('cart', JSON.stringify(newCart))
	}

	const updateCart = (newCart) => {
		setCart(newCart) / localStorage.setItem('cart', JSON.stringify(newCart))
	}

	return <CartContext.Provider value={{ cart, syncCart, updateCart }}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
