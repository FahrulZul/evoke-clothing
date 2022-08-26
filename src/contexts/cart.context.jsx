import { createContext, useState, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_CART_ISOPEN: "SET_CART_ISOPEN",
};

const INITIAL_STATE = {
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

export const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };

        case CART_ACTION_TYPES.SET_CART_ISOPEN:
            return {
                ...state,
                isCartOpen: payload,
            };
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
};

export const CartContext = createContext({
    isCartOpen: false,
    setCartItems: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemInCart: () => {},
    clearItemInCart: () => {},
    cartCount: 0,
    setcartCount: () => {},
    cartTotal: 0,
    setcartTotal: () => {},
});

export const CartProvider = ({ children }) => {
    const [{ cartItems, cartTotal, cartCount, isCartOpen }, dispatch] =
        useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );

        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartCount: newCartCount,
                cartTotal: newCartTotal,
            })
        );
    };

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItems(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemInCart = (cartItemToRemove) => {
        const newCartItems = removeCartItems(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemInCart = (cartItemToClear) => {
        const newCartItems = clearCartItems(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ISOPEN, bool));
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemInCart,
        clearItemInCart,
        cartTotal,
        cartCount,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
