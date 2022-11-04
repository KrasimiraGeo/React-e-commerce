import icon from '../../assets/cart-24.png'
import classes from './Header.module.css'

export const HeaderCartButton = (props) => {

    return (
        <div className={classes["topnav-right"]}>
            <img className={classes.cart} onClick={props.onClick} src={icon} alt='cart icon'></img>
            <span className={classes.counter}>0</span>
        </div>
    )
}