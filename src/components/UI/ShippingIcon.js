import classes from './ShippingIcon.module.css'
import icon from '../../assets/transit-50.png'
import { Fragment } from 'react'

export const ShippingIcon = () => {
    return (
        <Fragment>
             <div className={classes.wrapper}>
            <div className={classes.bg}>
                <img src={icon} alt='in transit'></img>
            </div>
            
        </div>
            <div className={classes.message}>
                <p>Your order is on the way!</p>
            </div>
        </Fragment>
       
    )
}