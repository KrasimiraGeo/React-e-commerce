import classes from './Card.module.css';
import { useContext, useRef, useState, Fragment } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Modal } from '../Modal/Modal'
import { CartContext } from '../../store/cart-context';
import { AuthContext } from '../../store/auth-context';
import { deleteProduct } from '../../pages/Admin/deleteProduct';
import { editProduct } from '../../pages/Admin/editProduct';

import swal from 'sweetalert';

export const Card = (props) => {
    let location = useLocation()
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
    const [formHasError, setFormHasError] = useState(false)

    const addItemHandler = (event) => {
        event.preventDefault()
        cartCtx.addItem({
            id: product.key,
            name: product.name,
            url: product.imageUrl,
            price: Number(product.price),
            quantity: Number(product.quantity),
            amount: 1
        })
    }

    const enableEditHandler = (event) => {
        event.preventDefault()
        setIsEdit(true)
    }

    const enableDeleteHandler = (event) => {
        event.preventDefault()
        swal('Are you sure you want to delete this product?', {
            icon: 'warning',
            dangerMode: true,
            buttons: {
                decline: {
                    text: 'No',
                    visible: true,
                    closeModal: true,
                    className: `${classes['custom-button']}`
                },
                confirm: 'Yes'
            },
        }).then((value) => {
            switch (value) {
                case 'decline':
                    declineDeleteHandler()
                    break;

                case true:
                    confirmDeleteHandler()
                    break;
            }
        })
        setIsDelete(true)
    }

    const confirmDeleteHandler = () => {
        deleteProduct(product).then((result) => {
            if (result.ok) {
                props.onActionChange(true)
            }
        })
        swal("Product was successfully deleted!", {
            icon: 'success',
            buttons: false,
            timer: 1000,
        })
        setIsDelete(false)
    }

    const declineDeleteHandler = () => {
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

        if (editedName !== '' && editedDescription !== '' && editedPrice !== '' && editedQuantity !== '') {
            setFormHasError(false)

            editProduct(editedProduct).then((result) => {
                swal("Loading...", {
                    icon: 'info',
                    buttons: false,
                    timer: 1300,
                })
                if (result.ok) {
                    props.onActionChange(true)
                    swal("Changes were successfully submitted!", {
                        icon: 'success',
                        buttons: false,
                        timer: 1300,
                    })
                }
            })
            setIsEdit(false)
        } else {
            setFormHasError(true)
        }
    }

    const discardEditHandler = () => {
        setIsEdit(false)
    }

    const enlargeImageHandler = () => {
        setIsLargeImage(true)
    }

    const getBackHandler = () => {
        setIsLargeImage(false)
    }

    return (
        <Fragment>
            <article key={product.key} className={classes.card}>
                <Link to={`${location.pathname}/zoom`}> <img src={product.imageUrl} alt="product" onClick={enlargeImageHandler} ></img></Link>
                {isEdit === false && <div className={classes.content}>
                    <p className={classes.title}>{product.name}</p>
                    <p className={classes.description}>{product.description}</p>
                    <p className={classes.price}>${product.price}</p>
                </div>
                }
                {isEdit && <div className={classes['content-edit']}>
                    <label>Title</label>
                    <input ref={nameEditRef} placeholder={product.name} defaultValue={product.name}></input>
                    <label>Description</label>
                    <input ref={descriptionEditRef} placeholder={product.description} defaultValue={product.description}></input>
                    <div className={classes['content-out']}>
                        <div className={classes['content-row']}>
                            <label>Price</label>
                            <input ref={priceEditRef} placeholder={product.price} defaultValue={product.price}></input>
                        </div>
                        <div className={classes['content-row']}>
                            <label>Quantity</label>
                            <input ref={quantityEditRef} placeholder={product.quantity} defaultValue={product.quantity}></input>
                        </div>
                    </div>
                </div>}
                {formHasError && <p className={classes.warning}>Fields should not be empty!</p>}

                <div className={classes.centered}>
                    {!authCtx.isAdmin && <button className={classes['button-action']} onClick={addItemHandler}>Add to bag</button>}
                    {authCtx.isAdmin && isEdit === false && <button className={classes['button-edit']} onClick={enableEditHandler}>Edit</button>}
                    {authCtx.isAdmin && isEdit === true && <button className={classes['button-edit']} onClick={submitEditHandler}>Submit</button>}
                    {authCtx.isAdmin && isEdit === true && <button className={classes['button-action']} onClick={discardEditHandler}>Discard</button>}
                    {authCtx.isAdmin && isEdit === false && <button className={classes['button-action']} onClick={enableDeleteHandler}>Delete</button>}
                </div>
            </article>

            {isLargeImage && <Link to={`${location.pathname}`} onClick={getBackHandler}>
                <Modal onClose={props.onClose}>
                    <div className={classes.large}>
                        <img src={product.imageUrl}></img>
                    </div>
                </Modal>
            </Link>}
        </Fragment>
    )
};
