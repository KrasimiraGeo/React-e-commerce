import { AuthContext } from "./auth-context"
import { useState } from "react"

export const AuthProvider = (props) => {

    const user = window.localStorage.getItem('user')
    console.log(user);
   
    const [token, setToken] = useState(null)
    const userIsLoggedIn = !!token // converts the value to a boolean value
    const [uid, setUid] = useState(null)
    const [userName, setUserName] = useState()
    const [userEmail, setUserEmail] = useState()
    const adminUid = 'p9Yxi8AGWeXtaHBNsqnLVYMVYqr1'
    const [isAdmin, setIsAdmin] = useState(false)

    const loginHandler =(data) => {
        setToken(data.idToken)
        setUid(data.localId)
        setUserName(data.displayName)
        setUserEmail(data.email)

        console.log(data);

        window.localStorage.setItem('user', `${data.displayName}`)
        window.localStorage.setItem('email', `${data.email}`)
        window.localStorage.setItem('uid', `${data.localId}`)
        window.localStorage.setItem('token', `${data.idToken}`)

        if(data.localId === adminUid){
            setIsAdmin(true)
        }
    }

    const logoutHandler =() => {
        setToken(null)
        setUid(null)
        setIsAdmin(false)
        setUserEmail(null)
        setUserName(null)

        window.localStorage.clear()
    }

    console.log(window.localStorage);

    const authContextValue ={
        userName: userName,
        email:userEmail,
        token: token,
        uid: uid,
        isLoggedIn: userIsLoggedIn,
        isAdmin: isAdmin,
        login: loginHandler, 
        logout: logoutHandler
    }

    console.log(window.localStorage);


    return <AuthContext.Provider value={authContextValue}>
        {props.children}
    </AuthContext.Provider>
}