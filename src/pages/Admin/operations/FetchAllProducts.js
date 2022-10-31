import classes from './FetchAllProducts.module.css'

import { storage } from '../../../FirebaseConfig/config'
import { listAll, ref, getDownloadURL } from 'firebase/storage'
import { useEffect, useState } from 'react'

export const FetchAllProducts = () => {

    const [imageList, setImageList] = useState([])  // keeping track of the url of every specific image in the storage
    const imageListRef = ref(storage, 'images/')     // make a ref to all images inside the filder

    const [isAdmin, setIsAdmin] = useState()

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

    return (
        <div className={classes.cards}>
            {imageList.map((url) => {
                return (
                    <article key={url} className={classes.card}>
                        <img src={url} alt="product"></img>
                        <div className={classes.content}>
                            <p>Short content.</p>
                        </div>
                        {isAdmin &&
                            <div className={classes.centered}>
                                <button className={classes['button-edit']}>Edit</button>
                                <button className={classes['button-edit']}>Delete</button>
                            </div>
                        }

                    </article>
                )
            })}
        </div>
    )
}