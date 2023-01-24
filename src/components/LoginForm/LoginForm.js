import { useState, useRef, useContext, Fragment } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Modal } from '../Modal/Modal'
import { AuthContext } from '../../store/auth-context'
import swal from 'sweetalert'

import { Account } from './Account'

import classes from './LoginForm.module.css'

export const LoginForm = (props) => {
    let history = useHistory()

    const registerUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyADTl1--oNKuDKpVAw7sDYjM8geUkJ9vVg'
    const loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyADTl1--oNKuDKpVAw7sDYjM8geUkJ9vVg'

    const [isLogIn, setIsLogIn] = useState(true)

    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const usernameInputRef = useRef()

    const authCtx = useContext(AuthContext)
    
    const storageUser = localStorage.getItem('user')
    console.log(storageUser);

    const logoutHandler = () => {
        authCtx.logout()
        // window.localStorage.clear()
    }

    const logInOptionHandler = () => {
        setIsLogIn(true)
    }

    const registerOptionHandler = () => {
        setIsLogIn(false)
    }

    const logInHandler = (event) => {
        event.preventDefault()

        const enteredEmail = emailInputRef.current.value
        const enteredPassword = passwordInputRef.current.value
        fetch(loginUrl,
            {
                method: "POST",
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            if (res.ok) {
                console.log(res);
                return res.json()
            } else {
                return res.json().then(data => {
                    let error = 'Authentication failed'
                    alert(error)
                    throw new Error(error)
                })
            }
        }).then(data => {
            console.log(data);
            authCtx.login(data)
            history.replace('/shop')
        }).catch(err => {
            alert(err.message)
        })

    }
    
    const registerHandler = (event) => {
        event.preventDefault()
        const enteredEmail = emailInputRef.current.value
        const enteredPassword = passwordInputRef.current.value
        const enteredUsername = usernameInputRef.current.value
        fetch(registerUrl,
            {
                method: "POST",
                body: JSON.stringify({
                    displayName: enteredUsername,
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return res.json().then(data => {
                    let error = 'Authentication failed'
                    alert(error)
                })
            }
        }).then(data => {
            authCtx.login(data.idToken)
            window.localStorage.setItem('user', `${data.displayName}`)
            // window.localStorage.setItem('token', `${data.idToken}`)
            history.replace('/shop')

        }).catch(err => {
            alert(err.message)
        })
    }

    let actionStyles = {
        logIn: '',
        register: ''
    }

    if (isLogIn === true) {
        actionStyles.logIn = classes["active"]
        actionStyles.register = classes["nonactive"]
    } else {
        actionStyles.logIn = classes["nonactive"]
        actionStyles.register = classes["active"]
    }

    return (
        <Fragment>
            <Modal onClose={props.onClose}>
                {!authCtx.isLoggedIn && <div className={classes.centered}>
                    <h2 className={actionStyles.logIn} onClick={logInOptionHandler}>Log in</h2>
                    <h2 className={actionStyles.register} onClick={registerOptionHandler}>Register</h2>
                </div>}
                {authCtx.isLoggedIn && <div>
                    <Account/>
                    <button onClick={logoutHandler}>Logout</button>
                </div>}
                <div className={classes.centered}>
                    <form className={classes.form1}>
                        {!isLogIn && !authCtx.isLoggedIn && <input className={classes.pass} type="text" placeholder="Username" ref={usernameInputRef} required />}
                        {!authCtx.isLoggedIn && <input className={classes.un} type="email" placeholder="Email" ref={emailInputRef} required />}
                        {!authCtx.isLoggedIn && <input className={classes.pass} type="password" placeholder="Password" ref={passwordInputRef} required />}
                        <div className={classes.centered}>
                            {!isLogIn && !authCtx.isLoggedIn && <button className={classes['button-submit']} onClick={registerHandler}>Register</button>}
                            {isLogIn && !authCtx.isLoggedIn && <button className={classes['button-submit']} onClick={logInHandler}>Log in</button>}
                        </div>
                    </form>
                </div>
            </Modal>
        </Fragment>
    )
}
