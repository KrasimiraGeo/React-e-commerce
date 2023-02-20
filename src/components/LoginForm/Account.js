import classes from './Account.module.css'
import { useContext } from "react"
import { AuthContext } from "../../store/auth-context"
import { AccountIcon } from "../UI/AccountIcon"
import { SmallLogoutIcon } from "../UI/SmallIcons"

export const Account = () => {

    const authCtx = useContext(AuthContext)
    const userName = authCtx.userName

    const logoutHandler = () => {
        authCtx.logout()
    }

    return (
        <div>
            <AccountIcon />
            <div className={classes.greeting}>
                <p>Hi, {userName}!</p>
            </div>
            {!authCtx.isAdmin && <div className={classes.wrapper}>
                <div className={classes.message}>
                    <p>Thank you for choosing SKY murals! </p>
                </div>
                <div className={classes.message}>
                    <p>We are pleased to have you as our client!</p>
                </div>
            </div>}

            {authCtx.isAdmin &&
                <div className={classes.wrapper}>
                    <div className={classes.message}>
                        <p>Can't wait for you to upload new products!</p>
                    </div>
                </div>}
            <button className={classes.logout} onClick={logoutHandler}>
                <SmallLogoutIcon />
            </button>
        </div>
    )
}