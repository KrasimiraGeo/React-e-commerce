import classes from './OrderForm.module.css'
import { Fragment, useContext, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../store/auth-context"
import { CartContext } from "../../store/cart-context"
import back from '../../assets/back-40.png'
import { SmallInfoIcon } from "../UI/SmallIcons"
import { ShippingIcon } from "../UI/ShippingIcon"

export const OrderForm = (props) => {

    const authCtx = useContext(AuthContext)
    const cartCtx = useContext(CartContext)

    const [orderSubmitted, setOrderSubmitted] = useState(false)
    const [formIsValid, setFormIsValid] =  useState(false)
    
    const userEmail = authCtx.email

    const nameInputRef = useRef()
    const [nameInputTouched, setNameInputTouched] = useState(false)
    const [nameIsValid, setNameIsValid] = useState()

    const cityInputRef = useRef()
    const [cityInputTouched, setCityInputTouched] = useState(false)
    const [cityIsValid, setCityIsValid] = useState()

    const addressInputRef = useRef()
    const [addressInputTouched, setAddressInputTouched] = useState(false)
    const [addressIsValid, setAddressIsValid] = useState()

    const emailInputRef = useRef()
    const [emailInputTouched, setEmailInputTouched] = useState(false)
    const [emailIsValid, setEmailIsValid] = useState()

    const [formHasError, setFormHasError] = useState()

    const submitOrderHandler = (event) => {
        event.preventDefault()
        if(!formIsValid){
            setFormHasError(true)
        }

        const enteredName = nameInputRef.current.value
        const enteredEmail = userEmail ? `${userEmail}` : emailInputRef.current.value
        const enteredCity = cityInputRef.current.value
        const enteredAddress = addressInputRef.current.value

        if(enteredName && enteredEmail && enteredAddress && enteredCity){
            setFormIsValid(true)
            setOrderSubmitted(true)
            cartCtx.clearCart()
            setFormHasError(false)
        }
        
    }    

    const nameBlurHanlder = () => {
        setNameInputTouched(true)
        if(nameInputRef.current.value !== ''){
            setNameIsValid(true)
        }else{
            setNameIsValid(false)
        }
    }

    const cityBlurHandler = () => {
        setCityInputTouched(true)
        if(cityInputRef.current.value !== ''){
            setCityIsValid(true)
        }else{
            setCityIsValid(false)
        }
    }

    const addressBlurHandler = ()=>{
        setAddressInputTouched(true)
        if(addressInputRef.current.value !==''){
            setAddressIsValid(true)
        }else{
            setAddressIsValid(false)
        }
    }

    const emailBlurHandler = ()=>{
        setEmailInputTouched(true)
        if(emailInputRef.current.value !==''){
            setEmailIsValid(true)
        }else{
            setEmailIsValid(false)
        }
    }

    const nameHasError = nameIsValid===false && nameInputTouched===true
    const nameInputClasses = nameHasError===true ? `${classes.check}` : `${classes.field}`

    const cityHasError = cityIsValid===false && cityInputTouched===true
    const cityInputClasses = cityHasError===true ? `${classes.check}` : `${classes.field}`
    
    const addressHasError = addressIsValid===false && addressInputTouched===true
    const addressInputClasses = addressHasError===true ? `${classes.check}` : `${classes.field}`

    const emailHasError = emailIsValid===false && emailInputTouched===true
    const emailInputClasses = emailHasError===true ? `${classes.check}` : `${classes.field}`



    return(
        <Fragment>
            {orderSubmitted===false && <Link to={'/shop/cart'}>
            <button className={classes.back} onClick={props.onBack} >
                <img src={back} alt='back'></img>
            </button>
            </Link>}
            {formIsValid===false && <SmallInfoIcon/>}
            {formIsValid===false && <div className={classes.message}>
            <h4>Enter your shipping details</h4>
             <input placeholder="Name" className={nameInputClasses} ref = {nameInputRef} onBlur={nameBlurHanlder.bind(nameInputRef)} ></input>
             <input placeholder="City" className = {cityInputClasses} ref ={cityInputRef} onBlur={cityBlurHandler.bind(cityInputRef)} ></input>
             <input placeholder="Address" className={addressInputClasses} ref ={addressInputRef} onBlur={addressBlurHandler.bind(addressInputRef)}  ></input>
             <input placeholder="Email"className={emailInputClasses} ref ={emailInputRef} onBlur={emailBlurHandler.bind(emailInputRef)} ></input>
             {formHasError && <p className={classes['error']}>Please fill in all fields!</p>}
             <button onClick={submitOrderHandler} >Submit order</button>
        </div>}
        {formIsValid && <ShippingIcon/>}
        </Fragment>
       
    )
}