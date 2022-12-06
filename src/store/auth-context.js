import React from "react"

export const AuthContext = React.createContext({

    token: '',
    uid: '',
    isLoggedIn: false,
    isAdmin: false, 
    login: (token) => {},
    logout: () => {}

})

