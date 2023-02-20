import classes from './LoginForm.module.css'
import { useState, useRef, useContext, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Modal } from '../Modal/Modal'
import { Account } from './Account'
import { SmallUserIcon } from '../UI/SmallIcons'
import { errorResponse } from './errorResponse'
import { AuthContext } from '../../store/auth-context'


export const LoginForm = (props) => {
    let history = useHistory()

    const authCtx = useContext(AuthContext)
    
    const registerUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyADTl1--oNKuDKpVAw7sDYjM8geUkJ9vVg'
    const loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyADTl1--oNKuDKpVAw7sDYjM8geUkJ9vVg'

    const [isLogIn, setIsLogIn] = useState(true)
    const [isRegister, setIsRegister] = useState()

    const emailInputRef = useRef()
    const [emailIsValid, setEmailIsValid] = useState()
    const [emailInputTouched, setEmailInputTouched] = useState(false)
    const emailRegex = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const [emailDoesNotMatch, setEmailDoesNotMatch] = useState(false)

    const passwordInputRef = useRef()
    const [passIsValid, setPassIsValid] = useState()
    const [passInputTouched, setPassInputTouched] = useState(false)
    const [shortPassword, setShortPassword] = useState(false)

    const usernameInputRef = useRef()
    const [nameIsValid, setNameIsValid] = useState()
    const [nameInputTouched, setNameInputTouched] = useState(false)

    const [errorMessage, setErrorMessage] = useState('')

    const nameInputBlurHanlder = () => {
        setNameInputTouched(true)
        if (usernameInputRef.current.value.trim() !== '') {
            setNameIsValid(true)
        } else {
            setNameIsValid(false)
        }
    }


    const passInputBlurHandler = () => {
        setPassInputTouched(true)
        if (passwordInputRef.current.value.trim() !== '') {
            setPassIsValid(true)
        } else {
            setPassIsValid(false)
        }
    }


    const emailInputBlurHandler = () => {
        setEmailInputTouched(true)
        if (emailInputRef.current.value.trim().match(emailRegex)) {
            setEmailIsValid(true)
        } else {
            setEmailIsValid(false)
        }
    }

    const logInOptionHandler = () => {
        setIsLogIn(true)
        setIsRegister(false)
    }

    const registerOptionHandler = () => {
        setIsLogIn(false)
        setIsRegister(true)
    }

    const logInHandler = (event) => {
        event.preventDefault()
        const validPass = passwordInputRef.current.value.length >= 6 ? true : false
        const validEmail = emailInputRef.current.value.match(emailRegex) ? true : false

        if (validEmail && validPass) {
            fetch(loginUrl,
                {
                    method: "POST",
                    body: JSON.stringify({
                        email: emailInputRef.current.value,
                        password: passwordInputRef.current.value,
                        returnSecureToken: true
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(res => {
                if (res.ok) {
                    setErrorMessage('')
                    return res.json()
                } else {
                    return res.json().then(data => {
                        let message = errorResponse(data)
                        setErrorMessage(message)
                    })
                }
            }).then(data => {
                authCtx.login(data)
                history.replace('/shop')
            }).catch(err => {
                setErrorMessage(err.message)
            })
        }
    }

    const registerHandler = (event) => {
        event.preventDefault()

        const validPass = passwordInputRef.current.value.length >= 6 ? true : false
        if (!validPass) {
            setShortPassword(true)
        } else {
            setShortPassword(false)
        }

        const validEmail = emailInputRef.current.value.match(emailRegex) ? true : false
        if (!validEmail) {
            setEmailDoesNotMatch(true)
        } else {
            setEmailDoesNotMatch(false)
        }

        if (validPass === true && validEmail && usernameInputRef.current.value !== '') {
            fetch(registerUrl,
                {
                    method: "POST",
                    body: JSON.stringify({
                        displayName: usernameInputRef.current.value,
                        email: emailInputRef.current.value,
                        password: passwordInputRef.current.value,
                        returnSecureToken: true
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(res => {
                if (res.ok) {
                    setErrorMessage('')
                    return res.json()
                } else {
                    return res.json().then(data => {
                        let message = errorResponse(data)
                        setErrorMessage(message)
                    })
                }
            }).then(data => {
                authCtx.login(data)
                history.replace('/shop')
            }).catch(err => {
                setErrorMessage(err.message)
            })
        }
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

    const nameHasError = !nameIsValid && nameInputTouched
    const nameInputClasses = nameHasError === true ? `${classes.check}` : `${classes.field}`

    const passHasError = !passIsValid && passInputTouched
    const passInputClasses = passHasError === true ? `${classes.check}` : `${classes.field}`

    const emailHasError = !emailIsValid && emailInputTouched
    const emailInputClasses = emailHasError === true ? `${classes.check}` : `${classes.field}`

    return (
        <Fragment>
            <Modal onClose={props.onClose}>
                {!authCtx.isLoggedIn && <SmallUserIcon />}
                {!authCtx.isLoggedIn && <div className={classes.centered}>
                    <h2 className={actionStyles.logIn} onClick={logInOptionHandler}>Log in</h2>
                    <h2 className={actionStyles.register} onClick={registerOptionHandler}>Register</h2>
                </div>}
                {authCtx.isLoggedIn && <Account />}
                <div className={classes.centered}>
                    <form className={classes.form1}>
                        {!isLogIn && !authCtx.isLoggedIn &&
                            <input className={nameInputClasses} type="text" placeholder="Username" ref={usernameInputRef} onBlur={nameInputBlurHanlder.bind(usernameInputRef)} />}
                        {!authCtx.isLoggedIn &&
                            <input className={emailInputClasses} type="email" placeholder="Email" ref={emailInputRef} onBlur={emailInputBlurHandler.bind(emailInputRef)} />}
                        {emailDoesNotMatch && <p>* Please enter a valid email address</p>}
                        {!authCtx.isLoggedIn &&
                            <input className={passInputClasses} type="password" placeholder="Password" ref={passwordInputRef} onBlur={passInputBlurHandler.bind(passwordInputRef)} />
                        }
                        {shortPassword &&
                            <p>* Password should be at least 6 symbols long</p>
                        }
                        {errorMessage !== '' && <p>{errorMessage}</p>}
                        <div className={classes.centered}>
                            {!isLogIn && !authCtx.isLoggedIn &&
                                <button className={classes['button-submit']} onClick={registerHandler}>Register</button>}
                            {isLogIn && !authCtx.isLoggedIn &&
                                <button className={classes['button-submit']} onClick={logInHandler}>Log in</button>}
                        </div>
                    </form>
                </div>
            </Modal>
        </Fragment>
    )
}
