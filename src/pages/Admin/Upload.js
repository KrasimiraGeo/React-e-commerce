import classes from './Upload.module.css'
import swal from 'sweetalert'
import { useState, Fragment, useRef, useContext} from 'react'
import { storage } from '../../FirebaseConfig/config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { AuthContext } from '../../store/auth-context'

export const Upload = (props) => {
    const authCtx = useContext(AuthContext)
    const dbUrl = 'https://art-shop-37d63-default-rtdb.europe-west1.firebasedatabase.app/.json'

    const [imageUpload, setImageUpload] = useState(null)
    const [imageFieldTouched, setImageFieldTouched] = useState(false)
    const [imageIsPresent, setImageIsPresent] = useState()

    const nameInputRef = useRef()
    const [nameInputTouched, setNameInputTouched] = useState(false)
    const [nameIsValid, setNameIsValid] = useState()

    const priceInputRef = useRef()
    const [priceInputTouched, setPriceInputTouched] = useState(false)
    const [priceIsValid, setPriceIsValid] = useState()

    const quantityInputRef = useRef()
    const [quantityInputTouched, setQuantityInputTouched] = useState(false)
    const [quantityIsValid, setQuantityIsValid] = useState()

    const descriptionInputRef=useRef()
    const [descriptionInputTouched, setDescriptionInputTouched] = useState(false)
    const [descriptionIsValid, setDescriptionIsValid] = useState()
    
    const [formIsVisible, setFormIsVisible] = useState(false)

   
    
    const handleChange = (event) => {
        setImageFieldTouched(true)

        if(event.target.files[0]){
            setImageIsPresent(true)
            setImageUpload(event.target.files[0])
        }else{
            setImageIsPresent(false)
        }
    }



    const nameBlurHandler = () => {
        setNameInputTouched(true)
        if(nameInputRef.current.value !== ''){
            setNameIsValid(true)
        }else{
            setNameIsValid(false)
        }
    }

    const quantityBlurHandler = () => {
        setQuantityInputTouched(true)
        if(quantityInputRef.current.value !== '' || Number(quantityInputRef.current.value) > 0){
            setQuantityIsValid(true)
        }else{
            setQuantityIsValid(false)
        }
    }

    const priceBlurHandler = () => {
        setPriceInputTouched(true)
        if(priceInputRef.current.value !== '' || Number(priceInputRef.current.value) > 0){
            setPriceIsValid(true)
        }else{
            setPriceIsValid(false)
        }
    }

    const descriptionBlurHandler = () => {
        setDescriptionInputTouched(true)
        if(descriptionInputRef.current.value !== ''){
            setDescriptionIsValid(true)
        }else{
            setDescriptionIsValid(false)
        }
    }

   

    const uploadImage = (event) => {
        event.preventDefault()
        if (imageUpload === null) {
            swal('Please import a file!', {
                icon: 'warning',
                timer: 2000
            })
        }

        const enteredName = nameInputRef.current.value
        const enteredPrice = priceInputRef.current.value
        const enteredQuantity = quantityInputRef.current.value
        const enteredDescription = descriptionInputRef.current.value
    
        const currentImageInfo = {
            name: enteredName,
            price:enteredPrice ,
            quantity: enteredQuantity,
            description: enteredDescription,
        }

        const formIsValid = imageUpload !== null &&  enteredName !== '' && enteredPrice !== '' && enteredDescription !== '' && enteredQuantity !== '' ? true:false
       
        if (authCtx.isAdmin && formIsValid===true) {
            const imageRef = ref(storage, `images/${imageUpload.name}`)
            uploadBytes(imageRef, imageUpload).then((result) => {
                swal("Loading...", {
                    icon: 'info',
                    buttons: false,
                    timer: 1300,
                  }) 
                return getDownloadURL(result.ref)
            }).then((downloadUrl) => {
                currentImageInfo.imageUrl = downloadUrl

                fetch(dbUrl, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentImageInfo)
                }).then((result)=>{
                    if(result.ok){
                        swal("The new product was successfully uploaded!", {
                            icon: 'success',
                            buttons: false,
                            timer: 1300,
                          })
                        props.onActionChange(true)
                    }else{
                        swal("Something went wrong! Please try again", {
                            icon: 'error',
                            buttons: false,
                            timer: 1300,
                          })
                    }
                })
                clearInputHandler()
            })
        }
    }

    const clearInputHandler = () => {
        document.getElementsByName('file')[0].value = ''
        nameInputRef.current.value=''
        priceInputRef.current.value=''
        quantityInputRef.current.value=''
        descriptionInputRef.current.value=''
    }

    const toggleUploadForm = (event) => {
        setFormIsVisible(!formIsVisible)
        if (formIsVisible) {
            event.target.textContent = 'Show upload form'
        } else {
            event.target.textContent = 'Hide upload form'
        }
    }

    const nameHasError = nameIsValid===false && nameInputTouched===true
    const nameInputClasses = nameHasError===true ? `${classes.check}` : `${classes["feedback-input"]}`

    const quantityHasError = quantityIsValid===false && quantityInputTouched===true
    const quantityInputClasses = quantityHasError ===true ? `${classes.check}` : `${classes["feedback-input"]}`
    
    const priceHasError = priceIsValid===false && priceInputTouched===true
    const priceInputClasses = priceHasError===true ? `${classes.check}` : `${classes["feedback-input"]}`

    const descriptionHasError = descriptionIsValid===false && descriptionInputTouched===true
    const descriptionInputClasses = descriptionHasError===true ? `${classes.check}` : `${classes["feedback-input"]}`


    return (
        <Fragment>
            <div>
                <div className={classes.centered}>
                    <button className={classes['button-form']} onClick={toggleUploadForm}>Show upload form</button>
                </div>
                {formIsVisible &&
                <div className={classes['form-wrapper']}>
                    <form id='form'>
                        <input
                            name="file"
                            type="file"
                            className={classes["feedback-input"]}
                            placeholder="Select an Image"
                            title='Select an image'
                            onChange={handleChange}
                            />
                        <input
                            name="name"
                            type="text"
                            className={nameInputClasses}
                            placeholder="Name"
                            ref={nameInputRef}
                            onBlur={nameBlurHandler.bind(nameInputRef)}
                             />
                        <input
                            name="quantity"
                            type="number"
                            min='0'
                            className={quantityInputClasses}
                            placeholder="Quantity"
                            ref={quantityInputRef}
                            onBlur={quantityBlurHandler.bind(quantityInputRef)}
                            />
                        <input
                            name="price"
                            type="number"
                            min='0'
                            className={priceInputClasses}
                            placeholder="Price"
                            ref={priceInputRef}
                            onBlur={priceBlurHandler.bind(priceInputRef)}
                            />
                        <textarea
                            name="description"
                            className={descriptionInputClasses}
                            placeholder="Description"
                            ref={descriptionInputRef}
                            onBlur={descriptionBlurHandler.bind(descriptionInputRef)}
                            />
                        <div className={classes.centered}>
                            <button className={classes['button-upload']} onClick={uploadImage}>Upload</button>
                        </div>
                    </form>
                    </div>
                }
            </div>
        </Fragment>
        
    )
}