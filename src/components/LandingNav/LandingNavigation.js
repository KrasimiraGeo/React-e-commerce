import { Fragment } from 'react'
import classes from './LandingNavigation.module.css'

export const LandingNavigation =() => {

    return(
        <Fragment>
        
        <nav className={classes.navbar}>
            <ul>
                <li><a href='/shop'>SHOP</a></li>
            </ul>
        </nav>
    </Fragment>
        
    )
}