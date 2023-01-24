import { Fragment, useContext, useRef, useState } from "react"

import { AuthContext } from "../../store/auth-context"
import icon from '../../assets/check.png'
import { CartContext } from "../../store/cart-context"
import { editProduct } from "../../pages/Admin/editProduct"

import { Link } from "react-router-dom"
import { Cart } from "./Cart"
import back from '../../assets/back-40.png'
import classes from './OrderForm.module.css'
import { SmallInfoIcon } from "./SmallIcons"
import { useLocation } from "react-router-dom"

import { Modal } from "../Modal/Modal"
import { useHistory } from "react-router-dom"

// clear cart after order submission
// update the product quantity after successfull submission

export const OrderForm = (props) => {

    console.log(props);
    const authCtx = useContext(AuthContext)
    console.log(authCtx);
    const cartCtx = useContext(CartContext)

    let history = useHistory()

    console.log(history);

    const [getBack, setGetBack] = useState()

    console.log(cartCtx);

    const [formIsValid, setFormIsValid] =  useState(false)
    
    const userName = authCtx.userName

    console.log(window.localStorage);
    const userEmail = authCtx.email

    const cityInputRef = useRef()
    const addressInputRef = useRef()
    const emailInputRef = useRef()
    const nameInputRef = useRef()

    console.log(authCtx);
    console.log(userEmail); //undefined if there is no logged in useer

   
    const submitOrderHandler = (event) => {
        event.preventDefault()
        const cartItems = cartCtx.items
        const cartItemsId = []

        // cartItems.forEach(element => {
        //     cartItemsId.push(element.id)
        // });

        // const quantityUpdatedProducts= []
        console.log(cartItemsId);

        if(!formIsValid){
            console.log('please fill in all fields');
        }

        console.log(cartCtx);
        const enteredName = nameInputRef.current.value
        const enteredEmail = userEmail ? `${userEmail}` : emailInputRef.current.value
        const enteredCity = cityInputRef.current.value
        const enteredAddress = addressInputRef.current.value

        //TODO: update quantity of product  - editProduct; new object of the product but quantity is updated
        // cartItems.forEach(product => {
        //     console.log(product);
        //     let newQuantity = product.quantity - 1

        //     quantityUpdatedProducts.push(...product, newQuantity)

            

        //     // editProduct(product)
        // })

        // console.log(quantityUpdatedProducts);

        if(enteredName && enteredEmail && enteredAddress && enteredCity){
            setFormIsValid(true)
            cartCtx.clearCart()
        }


    }

    const backHandler = () => {
        setGetBack(true)
    }

    
    
    return(
        <Fragment>
            <Link to={'/shop/cart'}>
            <button className={classes.back} onClick={props.onBack} >
                <img src={back}></img>
            </button>
            </Link>
           
            {formIsValid===false && <SmallInfoIcon/>}
            {formIsValid===false && <div className={classes.message}>
             <p>Enter your shipping details</p>
             {!userName && <input placeholder="Name" ref = {nameInputRef} required></input>}
             <input placeholder="City" ref ={cityInputRef} required ></input>
             <input placeholder="Address" ref ={addressInputRef} required ></input>
             <input placeholder="Email" ref ={emailInputRef} required ></input>
             <button onClick={submitOrderHandler} >Submit order</button>
        </div>}

        {formIsValid && 
        <div>
            <p>Your order was successfully submitted!</p>
            <img src={icon}></img>
            </div>}

{/* {getBack===true <Cart>} */}
        {/* {getBack===true && <Modal onClose={props.onClose}><Cart/></Modal>} */}
        </Fragment>
       
    )
}