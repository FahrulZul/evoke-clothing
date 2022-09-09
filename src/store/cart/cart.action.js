import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

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

export const setIsCartOpen = (boolean) => {
    return createAction(CART_ACTION_TYPES.SET_CART_ISOPEN, boolean);
};

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItems(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemInCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItems(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemInCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItems(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
