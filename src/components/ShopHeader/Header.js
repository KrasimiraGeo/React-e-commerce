import classes from './Header.module.css'
import cartIcon from '../../assets/cart-24.png'

import { Fragment } from 'react'
import {LoginForm} from '../LoginForm/LoginForm'

export const Header = () => {

   

    return (
        <Fragment>
            <div className={classes['bg-img']}>
                <div className={classes.container}>
                    <div className={classes.topnav}>
                        <a href="/">Home</a>
                        <a href="/shop">Shop</a>
                        <a href="/contact">Contact</a>
                        <div className={classes["topnav-right"]}>
                            <a href="/account">Account</a>
                            <a href="/cart"><img src={cartIcon} alt='cart icon'></img></a>
                        </div>
                    </div>
                </div>

                <div className={classes['container-text']}>
                    <div className={classes.centered}>Some text here</div>
                </div>

            </div>
        </Fragment>
    )
}