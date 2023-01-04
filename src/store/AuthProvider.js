import { AuthContext } from "./auth-context"
import { useState } from "react"

export const AuthProvider = (props) => {
   
    const [token, setToken] = useState(null)
    const userIsLoggedIn = !!token // converts the value to a boolean value
    const [uid, setUid] = useState(null)
    const [userName, setUsername] = useState()
    const adminUid = 'p9Yxi8AGWeXtaHBNsqnLVYMVYqr1'
    const [isAdmin, setIsAdmin] = useState(false)

    const loginHandler =(data) => {
        setToken(data.idToken)
        setUid(data.localId)
        setUsername(data.displayName)

        if(data.localId === adminUid){
            setIsAdmin(true)
        }
    }

    const logoutHandler =() => {
        setToken(null)
        setUid(null)
        setIsAdmin(false)
    }

    const authContextValue ={
        userName: userName,
        token: token,
        uid: uid,
        isLoggedIn: userIsLoggedIn,
        isAdmin: isAdmin,
        login: loginHandler, 
        logout: logoutHandler
    }


    return <AuthContext.Provider value={authContextValue}>
        {props.children}
    </AuthContext.Provider>
}