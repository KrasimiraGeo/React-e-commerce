import React from "react"

export const AuthContext = React.createContext({
    userName:'',
    token: '',
    uid: '',
    isLoggedIn: false,
    isAdmin: false, 
    login: (token) => {},
    logout: () => {}
})

