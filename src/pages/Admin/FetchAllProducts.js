import classes from './FetchAllProducts.module.css'
import { Fragment, useEffect, useState } from 'react'
import { Card } from '../../components/Card/Card'
import { fetchProducts } from './fetch'

export const FetchAllProducts = (props) => {

    // const dbUrl = 'https://art-shop-37d63-default-rtdb.europe-west1.firebasedatabase.app/.json'
    const [itemsInfo, setItemsInfo] = useState([])
    const loadedProducts =[]

    const [change, setChange] = useState(false)

    const reRenderHandler = (changeDetected) => {
        console.log(change);  //false
        setChange(changeDetected)
        console.log(change); // false
   }

    console.log(change);
    
    if(change === true){
        
        fetchProducts().then((result)=>{
            console.log(result);
            setItemsInfo(result)
        })
        setChange(false)
            console.log(itemsInfo);
    }

     // const [change, setChange] = useState(false)

    // let changeDetected = props.onDetectedChange
    // console.log(changeDetected)

    // const fetchProducts = async () => {
    //     const response = await fetch(dbUrl)
    //     if (!response.ok) {
    //         throw new Error('Something went wrong')
    //     }
    //     const data = await response.json()
    //     let workingData = Object.entries(data)
    //     for (let entry of workingData) {
    //         loadedProducts.push({
    //             key: entry[0],
    //             imageUrl: entry[1].imageUrl,
    //             name: entry[1].name,
    //             price: entry[1].price,
    //             quantity: entry[1].quantity,
    //             description: entry[1].description,
    //         })
    //     }
    //     setItemsInfo(loadedProducts)
    // }


    // if(changeDetected === true){
    //     setChange(true)
    // }
    
      // fetchProducts().catch((error) => {  // actually causes an infinite loop
        //     console.log(error);
        // })

    // initial render works fine - no infinite loop
    // when the function call is removed the automatic render does not work 

    useEffect(() => {
        fetchProducts().then((result)=>{
            setItemsInfo(result)
        })

        console.log(itemsInfo);
        // console.log(fetchProducts); // initial render print
        // setChange(false)
    }, [])

   

    return (
        <Fragment>
            {/* <div>
                <button onClick={fetchProducts}>Reload</button>
            </div> */}
            <div className={classes.cards}>
                {itemsInfo.map((product) => {
                    return (
                        <Fragment key={product.key}>
                            <Card item={product} onActionChange={reRenderHandler}></Card>
                        </Fragment>
                    )
                })}
            </div>
        </Fragment>
    )
}

