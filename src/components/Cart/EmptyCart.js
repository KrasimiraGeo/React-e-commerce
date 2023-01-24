import { Fragment } from 'react'
import { CartIcon } from './CartIcon'
import classes from './EmptyCart.module.css'


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