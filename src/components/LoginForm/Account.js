import { useContext } from "react"
import { AuthContext } from "../../store/auth-context"

export const Account = () => {

    const authCtx = useContext(AuthContext)
    const userName = authCtx.userName

    console.log(authCtx);

    return (<div>
        <p>Hi, {userName}!</p>
        {!authCtx.isAdmin && <p>You have not yet placed an order</p>}
        {/* {authCtx.isAdmin && <p></p>} */}
    </div>

    )
}