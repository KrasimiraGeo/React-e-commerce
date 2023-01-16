import classes from './Card.module.css';
import { useContext, useRef, useState } from 'react';
import { Fragment } from 'react';

import { CartContext } from '../../store/cart-context';
import { AuthContext } from '../../store/auth-context';

import {Modal} from '../Modal/Modal'

import { deleteProduct } from '../../pages/Admin/deleteProduct';
import { editProduct } from '../../pages/Admin/editProduct';

export const Card = (props) => {

    // console.log(props.onActionChange);
    const product = props.item
    const authCtx = useContext(AuthContext)
    const cartCtx = useContext(CartContext)

    const nameEditRef = useRef()
    const descriptionEditRef = useRef()
    const priceEditRef = useRef()
    const quantityEditRef = useRef()

    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [isLargeImage, setIsLargeImage] = useState(false)

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
        console.log('edit enabled'); 
    }

    const enableDeleteHandler = (event) => {
        event.preventDefault()
        setIsDelete(true)
        console.log('delete enabled');
    }

    // console.log(props);

    const confirmDeleteHandler = () => {
        deleteProduct(product).then((result) => {
            console.log(result);
            if(result.ok){
                props.onActionChange(true)
            }
        })

        console.log('deleted');
        setIsDelete(false)
        // props.onActionChange(true)
    }

    const declineDeleteHandler = () => {
        console.log('declined');
        setIsDelete(false)
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

        console.log(editProduct);

        editProduct(editedProduct).then((result)=>{
            if(result.ok){
                props.onActionChange(true)
            }
        console.log(result);
        })
        
        setIsEdit(false)
    }

    const discardEditHandler = () => {
        setIsEdit(false)
    }

    // TODO MAYBE: 
    // modal with enlarged image?
    
    // const enlargeImageHandler = () => {
    //    console.log('hover');
    // }

    // const closeModalHandler = () => {
    //     console.log('click on modal');
    //     setIsLargeImage(false)
    // }


    //defaultValue={product.name}
    return (
        <Fragment>
            {isDelete===true && <Modal>
                <p>Are you sure you want to delete this item?</p>
                <button onClick={confirmDeleteHandler}>Yes</button>
                <button onClick={declineDeleteHandler}>No</button>
                </Modal>}
            <article key={product.key} className={classes.card}>
                <img src={product.imageUrl} alt="product" ></img>
                {isEdit=== false && <div className={classes.content}>
                    <p className={classes.title}>{product.name}</p>
                   <p className={classes.description}>{product.description}</p>
                   <p className={classes.price}>${product.price}</p>
                </div>
                }
                {/* {isLargeImage && <Modal onHover={closeModalHandler}>
                    <div className={classes.imageModal}>
                    <img className = {classes.large} src={product.imageUrl} alt="product"></img>
                    </div>
                    </Modal>} */}
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
                    {authCtx.isAdmin && isEdit === false && <button className={classes['button-edit']} onClick={enableDeleteHandler}>Delete</button>}
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