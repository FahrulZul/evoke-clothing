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

const removeCartItems = (cartItems, productToRemove) => {
    if (productToRemove.quantity === 1) return cartItems;

    return cartItems.map((cartItem) =>
        cartItem.id === productToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};

const clearCartItems = (cartItems, productToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
};

export const CartContext = createContext({
    isCartOpen: false,
    setCartItems: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemInCart: () => {},
    clearItemInCart: () => {},
    countCart: 0,
    setCountCart: () => {},
    totalPrice: 0,
    setTotalPrice: () => {},
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [countCart, setCountCart] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItems(cartItems, productToAdd));
    };

    const removeItemInCart = (cartItemToRemove) => {
        setCartItems(removeCartItems(cartItems, cartItemToRemove));
    };

    const clearItemInCart = (cartItemToClear) => {
        setCartItems(clearCartItems(cartItems, cartItemToClear));
    };

    useEffect(() => {
        const sumItemInCart = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );

        const totalCartPrice = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );

        setTotalPrice(totalCartPrice);
        setCountCart(sumItemInCart);
    }, [cartItems]);

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemInCart,
        clearItemInCart,
        totalPrice,
        countCart,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
