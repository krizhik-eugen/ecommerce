import React, { useState, useEffect, createContext, useContext } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const onAdd = (product, quantity) => {
        const isProductInCart = cartItems.find(item => item._id === product._id)
            setTotalPrice( prevTotalPrice => prevTotalPrice + product.price * quantity)
            setTotalQuantities( prevTotalQuantities => prevTotalQuantities + quantity)

        if (isProductInCart) {
            const updatedCartItems = cartItems.map(item => {
                if (item._id === product._id) return {
                    ...item, quantity: item.quantity + quantity
                }
            })
            setCartItems(updatedCartItems)
        } else {
            product.quantity = quantity
            setCartItems([...cartItems, {...product}])
        }
            toast.success(`${quantity} ${product.name} added to the cart`)
    }

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity+1)
    }
    const decreaseQuantity = () => {
        setQuantity((prevQuantity) => {
            if(prevQuantity-1 < 1) return 1;
            return prevQuantity-1
        })
    }

    return (
        <Context.Provider value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            quantity,
            increaseQuantity,
            decreaseQuantity,
            onAdd,
            setShowCart
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => {
   return useContext(Context)
}