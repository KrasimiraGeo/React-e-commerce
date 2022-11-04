import classes from './FetchAllProducts.module.css'
import { Fragment, useEffect, useState } from 'react'

export const FetchAllProducts = () => {
    const dbUrl = 'https://art-shop-37d63-default-rtdb.europe-west1.firebasedatabase.app/.json'
    const [isAdmin, setIsAdmin] = useState()
    const [itemsInfo, setItemsInfo] = useState([])

    // let productDetails = []


    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(dbUrl)
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            const data = await response.json()
            console.log(data);

            let workingData = Object.entries(data)

            for (let entry of workingData) {
                console.log(entry);


                setItemsInfo((prev) => [...prev, {
                    key: entry[0],
                    imageUrl: entry[1].imageUrl,
                    name: entry[1].name,
                    description: entry[1].description,
                    price:  entry[1].price
                }])
            
               console.log(itemsInfo);
            }
            
        }
        fetchProducts().catch((error) => {
            console.log(error.message);
        })
    }, [])


    return (
        <div className={classes.cards}>
            {itemsInfo.map((product) => {
                return (
                    <article key={product.key}  className={classes.card}>
                        <img src={product.imageUrl} alt="product"></img>
                        <div className={classes.content}>
                            <p>{product.description}</p>
                            <p>{product.price}</p>
                        </div>
                        {isAdmin &&
                            <div className={classes.centered}>
                                <button className={classes['button-edit']}>Edit</button>
                                <button className={classes['button-edit']}>Delete</button>
                            </div>
                        }
                        {!isAdmin &&
                            <div className={classes.centered}>
                                <button className={classes['button-edit']}>Add to cart</button>
                            </div>
                        }
                    </article>
                )
            })}
        </div>
    )
}
