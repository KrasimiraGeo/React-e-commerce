import classes from './FetchAllProducts.module.css'
import { Fragment, useEffect, useState } from 'react'
import { Card } from '../../components/Card/Card'

export const FetchAllProducts = (props) => {

    const dbUrl = 'https://art-shop-37d63-default-rtdb.europe-west1.firebasedatabase.app/.json'
    const [itemsInfo, setItemsInfo] = useState([])
    const loadedProducts= []

    const [change, setChange] = useState(false)

    const reRenderHandler = (changeDetected) => {
        console.log(change);  //false
       setChange(changeDetected)
        console.log(change); // false
    }
    
            const fetchProducts = async () => {
                const response = await fetch(dbUrl)
                if (!response.ok) {
                    throw new Error('Something went wrong')
                }
                const data = await response.json()
                let workingData = Object.entries(data)
                for (let entry of workingData) {
                    loadedProducts.push({
                        key: entry[0],
                        imageUrl: entry[1].imageUrl,
                        name: entry[1].name,
                        price: entry[1].price,
                        quantity: entry[1].quantity,
                        description: entry[1].description,
                    })
                }
                setItemsInfo(loadedProducts)
            }

            fetchProducts().catch((error) => {
                console.log(error);
            })
    

       useEffect(()=> {
        fetchProducts()
        console.log('render'); // initial render print
       }, [])

    return (
        <Fragment>
            <div className={classes.cards}>
                {itemsInfo.map((product) => {
                    return (
                        <Fragment key={product.key}>
                            <Card  item={product}></Card>
                        </Fragment>
                    )
                })}
            </div>
        </Fragment>
    )
}

