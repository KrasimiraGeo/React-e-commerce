import classes from './SmallIcons.module.css'
import icon from '../../assets/bag-25.png'
import info from '../../assets/info-25.png'


export const SmallCartIcon = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.bg}>
                <img src={icon} alt='empty cart'></img>
            </div>
        </div>
    )
}

export const SmallInfoIcon = () => {

    return (
        <div className={classes.wrapper}>
            <div className={classes.bg}>
                <img src={info} alt='info'></img>
            </div>
        </div>
    )

}