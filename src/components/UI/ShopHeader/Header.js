import classes from './Header.module.css'
import icon from '../../../assets/cart.png'

import { Fragment } from 'react'


export const Header = () => {

    return (
        <Fragment>
           <div className={classes['bg-img']}>
            <div className={classes.container}>
                <div class={classes.topnav}>
                    <a href="/">Home</a>
                    <a href="/news">News</a>
                    <a href="/contact">Contact</a>
                    <div className={classes["topnav-right"]}>
                        <a href="/about">About</a>
                        <a href="/cart"><img src={icon} alt='cart icon'></img></a>
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