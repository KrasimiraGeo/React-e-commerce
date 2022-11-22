import { AuthContext } from "./auth-context"
import { useState } from "react"

export const AuthProvider = (props) => {

    const [token, setToken] = useState(null)
    const userIsLoggedIn = !!token // converts the value to a boolean value

    const loginHandler =(token) => {
        setToken(token)
    }

    const logoutHandler =() => {
        setToken(null)
    }

    const authContextValue ={
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler, 
        logout: logoutHandler
    }


    return <AuthContext.Provider value={authContextValue}>
        {props.children}
    </AuthContext.Provider>
}