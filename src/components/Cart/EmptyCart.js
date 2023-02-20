import classes from './EmptyCart.module.css'
import { Fragment } from 'react'
import { CartIcon } from './CartIcon'



export const EmptyCart = () => {
    return (
        <Fragment>
            <CartIcon/>
            <div className={classes.message}>
                <p>Your cart is currently empty</p>
            </div>
        </Fragment>
    )
}