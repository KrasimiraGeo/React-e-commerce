import { useState, useRef, useContext, Fragment } from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { Modal } from '../Modal/Modal'
import { AuthContext } from '../store/auth-context'

import classes from './LoginForm.module.css'

export const LoginForm = (props) => {

    let { path, url } = useRouteMatch()
    const [isModalVisible, setIsModalVisible] = useState(true)
    const strictPath = '/shop'

    let history= useHistory()
    

    const registerUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyADTl1--oNKuDKpVAw7sDYjM8geUkJ9vVg'
    const loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyADTl1--oNKuDKpVAw7sDYjM8geUkJ9vVg'

    const [isLogIn, setIsLogIn] = useState(true)

    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const usernameInputRef = useRef()

    const authCtx = useContext(AuthContext)

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
                return res.json()
            } else {
                return res.json().then(data => {
                    let error = 'Authentication failed'
                    alert(error)
                    throw new Error(error)
                })
            }
        }).then(data => {
            authCtx.login(data.idToken)
            history.replace('/shop')
            setIsModalVisible(false) // successful request; setting the token for the user
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
                //...
            } else {
                return res.json().then(data => {
                    //can add identifiers for different messages to show custom ones
                    let error = 'Authentication failed'
                    // if (data && data.error && data.error.message) {
                    //     error = data.error.message
                    // }
                    alert(error)
                })
            }
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
        {isModalVisible && <Modal onClose={props.onClose}>
            <Link to={`${url}`}>
                <button className={classes["button-exit"]} onClick={props.onClose}>X</button>
            </Link>
            <div className={classes.centered}>
                <h2 className={actionStyles.logIn} onClick={logInOptionHandler}>Log in</h2>
                <h2 className={actionStyles.register} onClick={registerOptionHandler}>Register</h2>
            </div>
            <div className={classes.centered}>
                <form className={classes.form1}>
                    {!isLogIn && <input className={classes.pass} type="text" placeholder="Username" ref={usernameInputRef} required />}
                    <input className={classes.un} type="email" placeholder="Email" ref={emailInputRef} required />
                    <input className={classes.pass} type="password" placeholder="Password" ref={passwordInputRef} required />
                    <div className={classes.centered}>
                        {!isLogIn && <button className={classes['button-submit']} onClick={registerHandler}>Register</button>}
                        {isLogIn && <button className={classes['button-submit']} onClick={logInHandler}>Log in</button>}
                    </div>
                </form>
            </div>
        </Modal>}
        </Fragment>
    )
}

