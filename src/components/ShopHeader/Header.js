import classes from './Header.module.css'

import { Fragment } from 'react'
import { HeaderAccountButton } from './HeaderAccountButton'
import { HeaderCartButton } from './HeaderCartButton'
export const Header = (props) => {

    return (
        <Fragment>
            <div className={classes['bg-img']}>
                <div className={classes.container}>
                    <div className={classes.topnav}>
                        <a href="/">Home</a>
                        <a href="/shop">Shop</a>
                        <a href="/contact">Contact</a>
                        <div className={classes["topnav-right"]}>
                            <HeaderCartButton onClick={props.onShowCart}/>
                            <HeaderAccountButton onClick={props.onShowLogin} />
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