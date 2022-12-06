import { AuthContext } from "./auth-context"
import { useState } from "react"

import jwt_decode from "jwt-decode"

export const AuthProvider = (props) => {

   
    const [token, setToken] = useState(null)
    const userIsLoggedIn = !!token // converts the value to a boolean value
    const [uid, setUid] = useState(null)
    const adminUid = 'p9Yxi8AGWeXtaHBNsqnLVYMVYqr1'
    const [isAdmin, setIsAdmin] = useState(false)

    const loginHandler =(token) => {
        setToken(token)
        let decodedUid = jwt_decode(token).user_id.toString()
        console.log(decodedUid);
        setUid(decodedUid)

        if(decodedUid === adminUid){
            setIsAdmin(true)
        }
        console.log(isAdmin);
    }


    const logoutHandler =() => {
        setToken(null)
        setUid(null)
        setIsAdmin(false)
    }

    const authContextValue ={
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