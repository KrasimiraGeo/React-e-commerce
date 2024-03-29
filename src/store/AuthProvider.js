import { AuthContext } from "./auth-context"
import { useState } from "react"

export const AuthProvider = (props) => {
    const adminUid = 'p9Yxi8AGWeXtaHBNsqnLVYMVYqr1'
    const localStorage = window.localStorage

    const [token, setToken] = useState(null)
    const [uid, setUid] = useState(null)
    const [userName, setUserName] = useState()
    const [userEmail, setUserEmail] = useState()
    const userIsLoggedIn = !!token 
    const [isAdmin, setIsAdmin] = useState(false)

    const loginHandler = (data) => {
        setToken(data.idToken)
        setUid(data.localId)
        setUserName(data.displayName)
        setUserEmail(data.email)

        window.localStorage.setItem('user', `${data.displayName}`)
        window.localStorage.setItem('email', `${data.email}`)
        window.localStorage.setItem('uid', `${data.localId}`)
        window.localStorage.setItem('token', `${data.idToken}`)

        if (data.localId === adminUid) {
            setIsAdmin(true)
        }
    }

    const logoutHandler = () => {
        setToken(null)
        setUid(null)
        setIsAdmin(false)
        setUserEmail(null)
        setUserName(null)

        window.localStorage.clear()
    }

    const authContextValue = {
        userName: userName,
        email: userEmail,
        token: token,
        uid: uid,
        isLoggedIn: userIsLoggedIn,
        isAdmin: isAdmin,
        login: loginHandler,
        logout: logoutHandler
    }

    if (localStorage.length > 0) {
        
        authContextValue.userName = localStorage.user
        authContextValue.email = localStorage.email
        authContextValue.token = localStorage.token
        authContextValue.uid = localStorage.uid
        authContextValue.isLoggedIn = true

        if (adminUid === localStorage.uid) {
            authContextValue.isAdmin = true
        } else {
            authContextValue.isAdmin = false
        }

    }

    return <AuthContext.Provider value={authContextValue}>
        {props.children}
    </AuthContext.Provider>
}