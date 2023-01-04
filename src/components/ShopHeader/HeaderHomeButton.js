import icon from '../../assets/home-20.png'
import classes from './Header.module.css'
import { Link} from 'react-router-dom'

export const HeaderHomeButton = (props) => {
 
    return (
        <div className={classes['topnav-left']}>
                <Link to={`/`}>
                    <img className={classes.img} onClick={props.onClick} src={icon} alt='home icon'></img>
                </Link>
        </div>


    )
}