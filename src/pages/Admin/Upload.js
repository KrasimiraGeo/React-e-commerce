import { useState, Fragment } from 'react'
import { storage } from '../../FirebaseConfig/config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage' // makes a reference for the file
import classes from './Upload.module.css'

import { AuthContext } from '../../store/auth-context'
import { useContext } from 'react'

export const Upload = (props) => {

    console.log(props);
    const authCtx = useContext(AuthContext)
    const dbUrl = 'https://art-shop-37d63-default-rtdb.europe-west1.firebasedatabase.app/.json'

    // refactor the input states to refs
    const [imageUpload, setImageUpload] = useState(null)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [description, setDescription] = useState('')
   
    const [formIsVisible, setFormIsVisible] = useState(false)

    const currentImageInfo = {
        name,
        price,
        quantity,
        description,
    }
    
    const handleChange = (event) => {
        setImageUpload(event.target.files[0])
    }

    const nameHandler = (event) => {
        setName(event.target.value)
    }

    const quantityHandler = (event) => {
        setQuantity(Number(event.target.value))
    }

    const priceHandler = (event) => {
        setPrice(Number(event.target.value))
    }

    const descriptionHandler = (event) => {
        setDescription(event.target.value)
    }

    const uploadImage = (event) => {
        event.preventDefault()

        if (imageUpload === null) {
            alert("Please choose a file first!")
        }

        // add check for the other fields as well - they must be full

        const imageRef = ref(storage, `images/${imageUpload.name}`)

        if (authCtx.isAdmin) {
            uploadBytes(imageRef, imageUpload).then((result) => {
                alert('Image uploaded')
                console.log(result.ref);
                return getDownloadURL(result.ref)
            }).then((downloadUrl) => {
                currentImageInfo.imageUrl = downloadUrl
                fetch(dbUrl, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentImageInfo)
                })
                clearInputHandler()
            })
        }
        props.onActionChange(true)
    }

    const clearInputHandler = () => {
        document.getElementsByName('file')[0].value = ''
        setName("")
        setPrice("")
        setQuantity("")
        setDescription("")
    }

    const toggleUploadForm = (event) => {
        setFormIsVisible(!formIsVisible)
        if (formIsVisible) {
            event.target.textContent = 'Show upload form'
        } else {
            event.target.textContent = 'Hide upload form'
        }
    }

    return (
        
        <Fragment>
            
            <div >
                <div className={classes.centered}>
                    <button className={classes['button-form']} onClick={toggleUploadForm}>Show upload form</button>
                </div>
                {formIsVisible &&
                    <form id='form'>
                        <input
                            name="file"
                            type="file"
                            className={classes["feedback-input"]}
                            placeholder="Select an Image"
                            onChange={handleChange}
                            required />
                        <input
                            name="name"
                            type="text"
                            className={classes["feedback-input"]}
                            placeholder="Name"
                            value={name}
                            onChange={nameHandler}
                            required />
                        <input
                            name="quantity"
                            type="number"
                            className={classes["feedback-input"]}
                            placeholder="Quantity"
                            value={quantity}
                            onChange={quantityHandler}
                            required />
                        <input
                            name="price"
                            type="number"
                            className={classes["feedback-input"]}
                            placeholder="Price"
                            value={price}
                            onChange={priceHandler}
                            required />
                        <textarea
                            name="description"
                            className={classes["feedback-input"]}
                            placeholder="Description"
                            value={description}
                            onChange={descriptionHandler}
                            required />
                        <div className={classes.centered}>
                            <button className={classes['button-upload']} onClick={uploadImage}>Upload to Firebase</button>
                        </div>
                    </form>
                }
            </div>
            
        </Fragment>
        
    )
}