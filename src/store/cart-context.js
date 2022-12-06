import React from "react";

export const CartContext = React.createContext({
    // the methods will not be used from here practically; they will help with autocompletion
    items:[], // managing the cart items
    totalAmount: 0, 
    url: '',
    addItem: () => {},
    removeItem: () => {}

})