import classes from './Header.module.css'

import { Fragment, useContext } from 'react'
import { HeaderAccountButton } from './HeaderAccountButton'
import { HeaderCartButton } from './HeaderCartButton'
import { AuthContext } from '../../store/auth-context'

export const Header = (props) => {

    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn

    return (
        <Fragment>
            <div className={classes['bg-img']}>
                <div className={classes.container}>
                    <div className={classes.topnav}>
                        <div className={classes['topnav-left']}>
                        <a href="/">Home</a>
                        {!isLoggedIn && <a href="/shop">Shop</a>}
                        <a href="/contact">Contact</a>
                        </div>
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