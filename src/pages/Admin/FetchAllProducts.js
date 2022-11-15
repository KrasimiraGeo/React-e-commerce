import classes from './FetchAllProducts.module.css'
import { Fragment, useEffect, useState } from 'react'
import { Card } from '../../components/Card/Card'

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
            const loadedProducts = []

            console.log(workingData);

            for (let entry of workingData) {
                loadedProducts.push({
                    key: entry[0],
                    imageUrl: entry[1].imageUrl,
                    name: entry[1].name,
                    description: entry[1].description,
                    price: entry[1].price,
                    quantity: entry[1].quantity
                })
            }
            setItemsInfo(loadedProducts)
        }
        fetchProducts().catch((error) => {
            console.log(error);
        })
    }, [])


    return (
        <div className={classes.cards}>
            {itemsInfo.map((product) => {
                return (
                    <Fragment key = {product.key}>
                    <Card item={product}></Card>
                    </Fragment>
                )
             
            })}
        </div>
    )
}


// ".read": "now < 1667599200000",
// ".write": "now < 1667599200000",

// const productsList = itemsInfo.map((product) => {
//     console.log(product);
//     <Card
//         key={product.key}
//         imageUrl={product.imageUrl}
//         name={product.name}
//         description={product.description}
//         price={product.price}
//     />
// })


   // return (
                //     <article key={product.key} className={classes.card}>
                //         <img src={product.imageUrl} alt="product"></img>
                //         <div className={classes.content}>
                //             <p>{product.description}</p>
                //             <p>{product.price}</p>
                //         </div>
                //         {!isAdmin &&
                //             <div className={classes.centered}>
                //                 <button className={classes['button-edit']} id={product.key} onClick={addToCartHandler} >Add to cart</button>
                //             </div>
                //         }
                //         {isAdmin &&
                //             <div className={classes.centered}>
                //                 <button className={classes['button-edit']}>Edit</button>
                //                 <button className={classes['button-edit']}>Delete</button>
                //             </div>
                //         }

                //     </article>
                // )

// {itemsInfo.map((product) => {
//     return (
//         <article key={product.key} className={classes.card}>
//             <img src={product.imageUrl} alt="product"></img>
//             <div className={classes.content}>
//                 <p>{product.description}</p>
//                 <p>{product.price}</p>
//             </div>
//             {isAdmin &&
//                 <div className={classes.centered}>
//                     <button className={classes['button-edit']}>Edit</button>
//                     <button className={classes['button-edit']}>Delete</button>
//                 </div>
//             }
//             {!isAdmin &&
//                 <div className={classes.centered}>
//                     <button className={classes['button-edit']}>Add to cart</button>
//                 </div>
//             }
//         </article>
//     )
// })}