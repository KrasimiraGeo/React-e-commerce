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
        //setIsEdit to false on submitChanges
    }

    const deleteItemHandler = (event) => {
        event.preventDefault()
        if (authCtx.isAdmin) {
            deleteProduct(product)
        }
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

    const discardEditHandler = () => {
        setIsEdit(false)
    }


    //defaultValue={product.name}
    return (
        <Fragment>
            <article key={product.key} className={classes.card}>
                <img src={product.imageUrl} alt="product"></img>
                {isEdit=== false && <div className={classes.content}>
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                </div>
                }
                {isEdit && <div className={classes.content}>
                    <input ref={nameEditRef} placeholder={product.name} defaultValue={product.name}></input>
                    <input ref={descriptionEditRef} placeholder={product.description} defaultValue={product.description}></input>
                    <input ref={priceEditRef} placeholder={product.price} defaultValue={product.price}></input>
                    <input ref={quantityEditRef} placeholder={product.quantity} defaultValue={product.quantity}></input>
                </div>}
                <div className={classes.centered}>
                    {!authCtx.isAdmin && <button className={classes['button-edit']} onClick={addItemHandler}>Add to bag</button>}
                    {authCtx.isAdmin && isEdit === false && <button className={classes['button-edit']} onClick={enableEditHandler}>Edit</button>}
                    {authCtx.isAdmin && isEdit === true && <button className={classes['button-edit']} onClick={submitEditHandler}>Submit</button>}
                    {authCtx.isAdmin && isEdit === true && <button className={classes['button-edit']} onClick={discardEditHandler}>Discard</button>}
                    {authCtx.isAdmin && isEdit === false && <button className={classes['button-edit']} onClick={deleteItemHandler}>Delete</button>}
                </div>
            </article>
        </Fragment>
    )
};

// {isEdit === false && <p>{product.name}</p>}
// {isEdit === false && <p>{product.description}</p>}
// {isEdit === false && <p>{product.price}</p>}

// {isEdit === true && <input ref={nameEditRef} placeholder={product.name} defaultValue={product.name}></input>}
// {isEdit === true && <input ref={descriptionEditRef} placeholder={product.description} defaultValue={product.description}></input>}
// {isEdit === true && <input ref={priceEditRef} placeholder={product.price} defaultValue={product.price}></input>}
// {isEdit === true && <input ref={quantityEditRef} placeholder={product.quantity} defaultValue={product.quantity}></input>}

//defaultValue={product.name}

//onChange={nameChangeHander}
//onChange={descriptionChangeHander}
//onChange={priceChangeHandler}
//onChange={quantityChangeHandler}