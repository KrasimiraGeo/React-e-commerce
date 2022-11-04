import icon from '../../assets/user-24.png'
import classes from './Header.module.css'

export const HeaderAccountButton = (props) => {

    return (
        <div className={classes["topnav-right"]}>
       <img className={classes.img} onClick ={props.onClick} src={icon} alt='account icon'></img>
       </div>
    )
}