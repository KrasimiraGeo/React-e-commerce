import classes from './Card.module.css';
import { useContext, useRef, useState } from 'react';
import { CartContext } from '../../store/cart-context';
import { AuthContext } from '../../store/auth-context';
import { Fragment } from 'react';

import { deleteProduct } from '../../pages/Admin/deleteProduct';
import { editProduct } from '../../pages/Admin/editProduct';

export const Card = (props) => {

    const product = props.item
    const authCtx = useContext(AuthContext)
    const cartCtx = useContext(CartContext)

    const nameEditRef = useRef()
    const descriptionEditRef = useRef()
    const priceEditRef = useRef()
    const quantityEditRef = useRef()

    const [isEdit, setIsEdit] = useState(false)

    // const editedProduct = {
    //     id:product.key,
    //     url: product.imageUrl,

    // }

    const addItemHandler = (event) => {
        event.preventDefault()
        cartCtx.addItem({
            id: product.key,
            name: product.name,
            url: product.imageUrl,
            price: product.price,
            amount: 1
        })
    }

    const enableEditHandler = (event) => {
        event.preventDefault()
        setIsEdit(true)

        // editProduct(product)


        //setIsEdit to false on submitChanges
    }




    const deleteItemHandler = (event) => {
        event.preventDefault()
        if (authCtx.isAdmin) {
            deleteProduct(product)
        }

    }

    const descriptionChangeHander = (event) => {
        // event.preventDefault()
        const enteredDescription = descriptionEditRef.current.value
        // editedProduct.newDescription = enteredDescription

        // console.log(enteredDescription);
    }

    const nameChangeHander = (event) => {
        const enteredName = nameEditRef.current.value
        // editedProduct.newName=enteredName
    }

    const priceChangeHandler = (event) => {
        const enteredPrice = priceEditRef.current.value
        // editedProduct.newPrice=enteredPrice

    }

    const quantityChangeHandler = (event) => {
        const enteredQuantity = quantityEditRef.current.value
        // editedProduct.newQuantity=enteredQuantity
    }

    const submitEditHandler = (event) => {
        event.preventDefault()
        

        const editedName = nameEditRef.current.value
        const editedDescription = descriptionEditRef.current.value
        const editedPrice = priceEditRef.current.value
        const editedQuantity = quantityEditRef.current.value

        const editedProduct = {
            id: product.key,
            url: product.imageUrl,
            name: editedName,
            description: editedDescription,
            price: editedPrice,
            quantity: editedQuantity
        }

        editProduct(editedProduct)
        
        console.log(editedProduct);

        setIsEdit(false)
    }


    return (
        <Fragment>
            <article key={product.key} className={classes.card}>
                <img src={product.imageUrl} alt="product"></img>
                <div className={classes.content}>
                    {isEdit === false && <p>{product.description}</p>}
                    {isEdit === false && <p>{product.price}</p>}
                    {isEdit === true && <input onChange={nameChangeHander} ref={nameEditRef} defaultValue={product.name}></input>}
                    {isEdit === true && <input onChange={descriptionChangeHander} ref={descriptionEditRef} defaultValue={product.description}></input>}
                    {isEdit === true && <input onChange={priceChangeHandler} ref={priceEditRef} defaultValue={product.price}></input>}
                    {isEdit === true && <input onChange={quantityChangeHandler} ref={quantityEditRef} defaultValue={product.quantity}></input>}
                </div>
                <div className={classes.centered}>
                    {!authCtx.isAdmin && <button className={classes['button-edit']} onClick={addItemHandler}>Add to bag</button>}
                    {authCtx.isAdmin && isEdit === false && <button className={classes['button-edit']} onClick={enableEditHandler}>Edit</button>}
                    {authCtx.isAdmin && isEdit === true && <button className={classes['button-edit']} onClick={submitEditHandler}>Submit Changes</button>}
                    {authCtx.isAdmin && <button className={classes['button-edit']} onClick={deleteItemHandler}>Delete</button>}
                </div>
            </article>
        </Fragment>
    )
};



