import classes from './Header.module.css'

import { Fragment} from 'react'
import { HeaderAccountButton } from './HeaderAccountButton'
import { HeaderCartButton } from './HeaderCartButton'
import { HeaderHomeButton } from './HeaderHomeButton'

export const Header = (props) => {

    return (
        <Fragment>
            <div className={classes['bg-img']}>
                <div className={classes.container}>
                    <div className={classes.topnav}>
                        <div className={classes['topnav-left']}>
                            <HeaderHomeButton/>
                        </div>
                        <div className={classes["topnav-right"]}>
                            <HeaderCartButton onClick={props.onShowCart}/>
                            <HeaderAccountButton onClick={props.onShowLogin} />
                        </div>
                    </div>
                </div>
                <div className={classes['container-text']}>
                    <div className={classes.centered}>Some text here</div>
                </div>
            </div>
        </Fragment>
    )
}