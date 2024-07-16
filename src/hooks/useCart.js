import { useState, useEffect } from 'react'
import { db } from '../data/db'

export const useCart = () => {
    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    })

    function addToCart(item) {
        const itemExist = cart.findIndex(guitar => guitar.id === item.id)
        if (itemExist >= 0) {
            if (cart[itemExist].quantity >= MAX_ITEMS) return
            const updateCart = [...cart]
            updateCart[itemExist].quantity++
            setCart(updateCart)
        }
        else {
            item.quantity = 1
            setCart(prevCar => [...prevCar, item])
        }
    }

    function removeFromCart(id) {
        setCart(prevCar => prevCar.filter(guitar => guitar.id != id))
    }

    function increasQuantity(id) {
        const updateCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    function decreasQuantity(id) {
        const updateCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    function clearCart() {
        setCart([])
    }

    /* 
      useState(() => {
        setData(db)
      }, []) */
    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreasQuantity,
        increasQuantity,
        clearCart
    }
}
