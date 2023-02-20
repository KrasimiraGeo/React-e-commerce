import classes from './AccountIcon.module.css'
import icon from '../../assets/user-50.png'


export const AccountIcon = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.bg}>
                <img src={icon} alt='account avatar'></img>
            </div>

        </div>


    )
}