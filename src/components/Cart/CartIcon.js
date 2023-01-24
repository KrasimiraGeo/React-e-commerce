import classes from './CartIcon.module.css'
import icon from '../../assets/bag-50.png'

export const CartIcon = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.bg}>
                <img src={icon} alt='empty cart'></img>
            </div>
        </div>
    )
}