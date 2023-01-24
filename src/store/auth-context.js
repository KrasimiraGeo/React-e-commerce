import React from "react"

export const AuthContext = React.createContext({
    userName:'',
    email:'',
    token: '',
    uid: '',
    isLoggedIn: false,
    isAdmin: false, 
    login: (token) => {},
    logout: () => {}
})

