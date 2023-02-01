import { Fragment } from 'react'
import classes from './LandingNavigation.module.css'

export const LandingNavigation = () => {

    return (
        <Fragment>
            <div className={classes.wrapper}>
             <nav className={classes.navbar}>
                <ul>
                    <li><a href='/shop'>SHOP</a></li>
                </ul>
                {/* <ul className={classes.about}>
                    <li><a href='/shop'>ABOUT</a></li>
                </ul> */}
            </nav>
             </div>
            
        </Fragment>

    )
}