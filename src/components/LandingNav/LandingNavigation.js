import classes from './LandingNavigation.module.css'

export const LandingNavigation =() => {

    return(

        <nav className={classes.navbar}>
            <ul>
                <li><a href='/'>HOME</a></li>
                <li><a href='/shop'>SHOP</a></li>
                <li><a href='about'>ABOUT</a></li>
            </ul>
        </nav>
        
    )
}