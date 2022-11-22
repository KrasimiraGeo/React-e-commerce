import { useContext } from "react"
import { Link, useRouteMatch } from "react-router-dom"

import { Modal } from "../Modal/Modal"
import classes from './Cart.module.css'
import { CartContext } from "../store/cart-context"
import { CartItem } from "./CartItem"

export const Cart = (props) => {

    let{path, url} =useRouteMatch()

    const cartCtx = useContext(CartContext)
    console.log(cartCtx.items);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0

    const cartItemRemoveHandler = (id) =>{
        cartCtx.removeItem(id)
    }

    const cartItemAddHandler =(item)=>{
        cartCtx.addItem({...item, amount: 1})
    }

    const cartItems = <ul className={classes["cart-items"]}>
        {cartCtx.items.map((item) =>
            <CartItem 
            key={item.id} 
            name={item.name} 
            amount={item.amount} 
            price={item.price}
            url={item.url}
            onRemove={cartItemRemoveHandler.bind(null, item.id)} // make sure the id is passed to the handler
            onAdd = {cartItemAddHandler.bind(null, item)} // make sure the whole item is passed to the handler
            />
        )}
    </ul>

    return (
        <Modal onClose={props.onClose} >
            <Link to={`${url}`}>
            <button className={classes["button-exit"]} onClick={props.onClose}>X</button>
            </Link>
            <div>{cartItems}</div>
            <div className={classes.total}>
                <span>Total amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
            
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}