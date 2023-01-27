import classes from './SmallIcons.module.css'
import bag from '../../assets/bag-25.png'
import info from '../../assets/more-info-25.png'
import user from '../../assets/user-25.png'
import logout from '../../assets/logout-25.png'


export const SmallCartIcon = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.bg}>
                <img src={bag} alt='empty cart icon'></img>
            </div>
        </div>
    )
}

export const SmallInfoIcon = () => {

    return (
        <div className={classes.wrapper}>
            <div className={classes.bg}>
                <img src={info} alt='info icon'></img>
            </div>
        </div>
    )

}

export const SmallUserIcon = () => {

    return (
        <div className={classes.wrapper}>
            <div className={classes.bg}>
                <img src={user} alt='user icon'></img>
            </div>
        </div>
    )
}

export const SmallLogoutIcon = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.bg}>
                <img src={logout} alt='logout icon'></img>
            </div>
        </div>
    )

}
