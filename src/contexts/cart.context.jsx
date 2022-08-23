import { createContext, useEffect, useState } from "react";

const addCartItems = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
    isCartOpen: false,
    setCartItems: () => {},
    cartItems: [],
    addItemToCart: () => {},
    countCart: 0,
    setCountCart: () => {},
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [countCart, setCountCart] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItems(cartItems, productToAdd));
    };

    useEffect(() => {
        const sumItemInCart = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );

        setCountCart(sumItemInCart);
    }, [cartItems]);

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        countCart,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
