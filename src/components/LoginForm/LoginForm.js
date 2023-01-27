import { useState, useRef, useContext, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Modal } from '../Modal/Modal'
import { AuthContext } from '../../store/auth-context'
import swal from 'sweetalert'

import { Account } from './Account'

import classes from './LoginForm.module.css'
import { SmallUserIcon } from '../UI/SmallIcons'

export const LoginForm = (props) => {
    let history = useHistory()

    const authCtx = useContext(AuthContext)

    const registerUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyADTl1--oNKuDKpVAw7sDYjM8geUkJ9vVg'
    const loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyADTl1--oNKuDKpVAw7sDYjM8geUkJ9vVg'

    const [isLogIn, setIsLogIn] = useState(true)

    const [emailInput, setEmailInput] = useState('')
    const [emailIsValid, setEmailIsValid] = useState()
    const [emailInputTouched, setEmailInputTouched] = useState(false)

    const [passInput, setPassInput] = useState('')
    const [passIsValid, setPassIsValid] = useState()
    const [passInputTouched, setPassInputTouched] = useState(false)

    const [nameInput, setNameInput] = useState('')
    const [nameIsValid, setNameIsValid] = useState()
    const [nameInputTouched, setNameInputTouched] = useState(false)


    const nameInputHandler = (event) => {
        setNameInput(event.target.value)
        if (event.target.value.trim() !== '') {
            setNameIsValid(true)
        } else {
            setNameIsValid(false)
        }
    }

    const nameInputBlurHanlder = () => {
        setNameInputTouched(true)
        if (nameInput.trim() !== '') {
            setNameIsValid(true)
        } else {
            setNameIsValid(false)
        }
    }

    const passInputHandler = (event) => {
        setPassInput(event.target.value)
        if (event.target.value.trim() !== '') {
            setPassIsValid(true)
        } else {
            setPassIsValid(false)
        }
    }

    const passInputBlurHandler = () => {
        setPassInputTouched(true)
        if (passInput.trim() !== '') {
            setPassIsValid(true)
        } else {
            setPassIsValid(false)
        }
    }

    const emailInputHandler = (event) => {
        setEmailInput(event.target.value)
        if (event.target.value.trim() !== '') {
            setEmailIsValid(true)
        } else {
            setEmailIsValid(false)
        }
    }

    const emailInputBlurHandler = () => {
        setEmailInputTouched(true)
        if (emailInput.trim() !== '') {
            setEmailIsValid(true)
        } else {
            setEmailIsValid(false)
        }
    }

    const logInOptionHandler = () => {
        setIsLogIn(true)
    }

    const registerOptionHandler = () => {
        setIsLogIn(false)
    }

    const logInHandler = (event) => {
        event.preventDefault()
        if (emailInput !== '' && passInput !== '') {
            fetch(loginUrl,
                {
                    method: "POST",
                    body: JSON.stringify({
                        email: emailInput,
                        password: passInput,
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
    }

    const registerHandler = (event) => {
        event.preventDefault()

        if (passInput !== '' && emailInput !== '' && nameInput !== '') {
            fetch(registerUrl,
                {
                    method: "POST",
                    body: JSON.stringify({
                        displayName: nameInput,
                        email: emailInput,
                        password: passInput,
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
                history.replace('/shop')
            }).catch(err => {
                alert(err.message)
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
    const nameInputClasses = nameHasError ? `${classes.invalid}` : `${classes.un}`

    const passHasError = !passIsValid && passInputTouched
    const passInputClasses = passHasError ? `${classes.invalid}` : `${classes.un}`

    const emailHasError = !emailIsValid && emailInputTouched
    const emailInputClasses = emailHasError ? `${classes.invalid}` : `${classes.un}`

    const formHasError = nameHasError || passHasError || emailHasError

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
                            <input className={nameInputClasses} type="text" placeholder="Username" onChange={nameInputHandler} onBlur={nameInputBlurHanlder.bind(nameInput)} value={nameInput} />}
                        {!authCtx.isLoggedIn &&
                            <input className={emailInputClasses} type="email" placeholder="Email" onChange={emailInputHandler} onBlur={emailInputBlurHandler.bind(emailInput)} value={emailInput} />}
                        {!authCtx.isLoggedIn &&
                            <input className={passInputClasses} type="password" placeholder="Password" onChange={passInputHandler} onBlur={passInputBlurHandler.bind(passInput)} value={passInput} />}
                        {formHasError && <p className={classes.warning}>Please fill in the empty fields!</p>}
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
