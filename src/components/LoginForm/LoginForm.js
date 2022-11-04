import { useState } from 'react'
import { Modal } from '../Modal/Modal'

import classes from './LoginForm.module.css'

export const LoginForm = (props) => {

    const [isSignIn, setIsSignIn] = useState(true)

    const signInHandler = event => {
        setIsSignIn(true)
    }

    const signUpHandler = event => {
        setIsSignIn(false)
    }

    let actionStyles = {
        signIn: '',
        signUp: ''
    }

    if (isSignIn === true) {
        actionStyles.signIn = classes["active"]
        actionStyles.signUp = classes["nonactive"]
    } else {
        actionStyles.signIn = classes["nonactive"]
        actionStyles.signUp = classes["active"]
    }

    return (
        <Modal onClose={props.onClose}>
            <button className={classes["button-exit"]} onClick={props.onClose}>X</button>
            <div className={classes.centered}>
                <h2 className={actionStyles.signIn} onClick={signInHandler}>Sign In</h2>
                <h2 className={actionStyles.signUp} onClick={signUpHandler}>Sign Up</h2>
            </div>
            <div className={classes.centered}>
                <form className={classes.form1}>
                    {!isSignIn && <input className={classes.pass} type="email" placeholder="Email" />}
                    <input className={classes.un} type="text" placeholder="Username" />
                    <input className={classes.pass} type="password" placeholder="Password" />
                    <div className={classes.centered}>
                        {!isSignIn &&  <button className={classes['button-submit']}>Sign up</button>}
                        {isSignIn && <button className={classes['button-submit']}>Sign in</button>}
                    </div>
                </form>
            </div>
        </Modal>
    )
}

