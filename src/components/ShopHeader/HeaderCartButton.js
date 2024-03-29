import icon from '../../assets/shopping-bag-20.png'
import classes from './Header.module.css'

import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../store/cart-context'
import { useRouteMatch, Link } from 'react-router-dom'

export const HeaderCartButton = (props) => {

    let { path, url } = useRouteMatch()

    const [btnHiglight, setBtnHighlight] = useState(false)
    const cartCtx = useContext(CartContext)  // the header cart button will be re-evaluated when the context changes
    const { items } = cartCtx

    const numberOfCartItems = cartCtx.items.reduce((currNum, item) => {
        return currNum + item.amount
    }, 0)


    const animationClass = `${classes["topnav-right"]} ${btnHiglight ? classes.bump : ''}`

    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return
        }
        setBtnHighlight(true)
        const timer = setTimeout(() => {
            setBtnHighlight(false) // remove the added animation style
        }, 300)

        return () => {
            clearTimeout(timer) // cleanup function
        }
    }, [items]) // passing only the items array as dep; otherwise will re-render every time there is a change in the context 

    return (
        <div className={classes["topnav-right"]}>
            <button className={animationClass}>
                <Link to={`${url}/cart`}>
                    <img className={classes.cart} onClick={props.onClick} src={icon} alt='cart icon'></img>
                    <span className={classes.counter}>{numberOfCartItems}</span>
                </Link>
            </button>
        </div>
    )
}