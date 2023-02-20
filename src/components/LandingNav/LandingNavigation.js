import classes from './LandingNavigation.module.css'
import { Fragment } from 'react'

export const LandingNavigation = () => {

    return (
        <Fragment>
            <div className={classes.wrapper}>
             <nav className={classes.navbar}>
                <ul>
                    <li><a href='/shop'>SHOP</a></li>
                </ul>
            </nav>
             </div>
        </Fragment>

    )
}