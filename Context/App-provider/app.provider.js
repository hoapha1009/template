import React, { createContext, useState, useEffect } from "react";

import {
    addItemToCart,
    removeItemFromCart,
    filterItemFromCart,
    getCartItemsCount,
} from "./cart.utils";

export const CartContext = createContext({
    // Khai báo các giá trị dùng cho app - context
    hidden: true,
    toggleHidden: () => {},
    cartItems: [],
    addItem: () => {},
    removeItem: () => {},
    clearItemFromCart: () => {},
    cartItemsCount: 0,
});

const CartProvider = ({ children }) => {
    const [hidden, setHidden] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);

    const addItem = (item) => setCartItems(addItemToCart(cartItems, item));
    const removeItem = (item) =>
        setCartItems(removeItemFromCart(cartItems, item));
    const toggleHidden = () => setHidden(!hidden);
    const clearItemFromCart = (item) =>
        setCartItems(filterItemFromCart(cartItems, item));

    useEffect(() => {
        setCartItemsCount(getCartItemsCount(cartItems));
    }, [cartItems]);

    return (
        <CartContext.Provider //truyền giá trị dùng
            value={{
                hidden,
                toggleHidden,
                cartItems,
                addItem,
                removeItem,
                clearItemFromCart,
                cartItemsCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
