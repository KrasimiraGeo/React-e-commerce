import { CartContext } from "./cart-context"
import { useReducer } from "react" // for more complex logic - checking if item is already in the cart

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => { // action is dispatched by us; state is the last state sbapshot, returning a new state snapshot

    if (action.type === 'ADD') {
        // console.log(state);
        const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount)
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id) // returns the index of an item if it already in the state
        const existingCartItem = state.items[existingCartItemIndex]

        // console.log(existingCartItem);

        let updatedItems
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        } else {

            updatedItems = state.items.concat(action.item)
        }
        // returns a new array of items from the state

        return { //  a new state snapshot
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
        const existingItem = state.items[existingCartItemIndex]
        const updatedTotalAmount = state.totalAmount - existingItem.price
        let updatedItems
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id) // all items that are not with that ID are kept in the list
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'CLEAR'){
        return{
            items:[],
            totalAmount: 0
        }
    }

    return defaultCartState
}


export const CartProvider = (props) => {
    //managing the cart context data and provide it to all components that want access to it


    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    // console.log(cartState);
    const addItemToCartHandler = (item) => {
        // console.log(item);
        dispatchCartAction({
            type: 'ADD',
            item: item,
             // forwarding the item to the reducer
        })
    }

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({
            type: 'REMOVE',
            id: id
        })
    }

    const clearCartHandler = () => {
        dispatchCartAction({
            type: 'CLEAR'
        })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        url: cartState.items.url,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    }

    

    return (  // wrap any components that want access to the context
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}