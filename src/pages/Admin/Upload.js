import { useState, useEffect } from 'react'
import { storage } from '../../FirebaseConfig/config'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage' // makes a reference for the file

import classes from './Upload.module.css'

export const Upload = (props) => {

    const dbUrl = 'https://art-shop-37d63-default-rtdb.europe-west1.firebasedatabase.app/.json'

    const [imageUpload, setImageUpload] = useState(null)
    const [imageList, setImageList] = useState([])  // keeping track of the url of every specific image in the storage
    const imageListRef = ref(storage, 'images/')     // make a ref to all images inside the filder

    const currentImageInfo = {}


    const refreshPage = () => {
        window.location.reload(false);
    }

    const handleChange = (event) => {
        setImageUpload(event.target.files[0])
    }

    const nameHandler = (event) => {
        currentImageInfo.name = event.target.value
    }

    const quantityHandler = (event) => {
        let productQuantity = event.target.value
        currentImageInfo.quantity = productQuantity

        if (productQuantity >= 1) {
            currentImageInfo.inStock = true
        } else {
            currentImageInfo.inStock = false
        }
    }

    const priceHandler = (event) => {
        currentImageInfo.price = event.target.value
    }

    const descriptionHandler =(event)=>{
        currentImageInfo.description=event.target.value
    }

    const uploadImage = () => {
        if (imageUpload === null) {
            alert("Please choose a file first!")
        }

        const imageRef = ref(storage, `images/${imageUpload.name}`)

        uploadBytes(imageRef, imageUpload).then((result) => {
            console.log(result.metadata);
            alert('Image uploaded')
            return getDownloadURL(result.ref)
        }).then((downloadUrl) => {
            currentImageInfo.url = downloadUrl
            putData()
            // console.log(currentImageInfo);
            // console.log('File available at', downloadUrl);
        })

    }

    // listing all images from the storage 
    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    if (!imageList.includes(url)) {
                        setImageList((prev) => [...prev, url])
                    }
                })
            })
        })
    }, [])


    const putData = async () => {
        const response = await fetch(dbUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(currentImageInfo)
        })

        const data = await response.json()
        console.log(data);

    }

    return (
        <div>
             {/* <form >
                <input name="file" type="file" className={classes["feedback-input"]} placeholder="Select an Image" onChange={handleChange}></input>
                <input name="name" type="text" className={classes["feedback-input"]} placeholder="Name" onChange={nameHandler} />
                <input name="quantity" type="number" className={classes["feedback-input"]} placeholder="Quantity" onChange={quantityHandler} />
                <input name="price" type="number" className={classes["feedback-input"]} placeholder="Price" onChange={priceHandler} />
                <textarea name="description" className={classes["feedback-input"]} placeholder="Description" onChange={descriptionHandler}></textarea>
                <button type="submit" value="Upload Data" onSubmit={uploadImage} />
            </form> */}
            <input type="file" onChange={handleChange} />
            <label>Name:
                <input type='text' onChange={nameHandler}></input>
            </label>
            <label>Price:
                <input type='number' onChange={priceHandler}></input>
            </label>
            <label>Quantity:
                <input type='number' onChange={quantityHandler}></input>
            </label>

            <button onClick={uploadImage}>Upload to Firebase</button>
            <div className={classes.cards}>
                {imageList.map((url) => {
                    return (
                        <article key={url} className={classes.card}>
                            <img src={url} alt="product image"></img>
                            <div className={classes.content}>
                                <p>Short content.</p>
                            </div>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}



