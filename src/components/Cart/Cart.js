import { Modal } from "../Modal/Modal"
import classes from './Cart.module.css'


export const Cart = (props) => {

    const cartItems = <ul className={classes["cart-items"]}>{[
        {
            id: 'c1',
            name: 'Orange sky',
            amount: 1,
            price: 156
        }
    ].map((item) => <li>{item.name}</li>)}</ul>

    return (
        <Modal onClose={props.onClose} >
            <div>this is the cart section</div>
            <div>{cartItems}</div>
            <div className={classes.total}>
                <span>Total amount</span>
                <span>124</span>
            </div>
            <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    )
}