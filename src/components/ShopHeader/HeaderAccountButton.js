import icon from '../../assets/user-20.png'
import classes from './Header.module.css'
import { Link, useRouteMatch } from 'react-router-dom'

export const HeaderAccountButton = (props) => {
    console.log(props);
    let { path, url } = useRouteMatch()
   

    return (
        <div className={classes["topnav-right"]}>
                <Link to={`${url}/account`}>
                    <img className={classes.img} onClick={props.onClick} src={icon} alt='account icon'></img>
                </Link>
        </div>


    )
}