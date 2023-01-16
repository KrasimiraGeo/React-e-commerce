import classes from './FetchAllProducts.module.css'
import { Fragment, useEffect, useState, useContext } from 'react'
import { Card } from '../../components/Card/Card'
import { fetchProducts } from './fetch'
import { AuthContext } from '../../store/auth-context'
import { Upload } from './Upload'
import { PhoneAuthProvider } from 'firebase/auth'

export const FetchAllProducts = (props) => {
    
    const ctx = useContext(AuthContext)

    // const dbUrl = 'https://art-shop-37d63-default-rtdb.europe-west1.firebasedatabase.app/.json'
    const [itemsInfo, setItemsInfo] = useState([])
    const loadedProducts = []

    console.log(props.onDetectedChange);
    console.log(props);
    const [change, setChange] = useState()

    console.log(change);

    const reRenderHandler = (changeDetected) => {
        console.log(change); 
        setChange(changeDetected)
        console.log(change); 
   }

    console.log(change);

    // if(props.onDetectedChange === true){
    //     setChange(true)
    // }
    
    if(change === true){
        console.log('detected change');

        fetchProducts().then((result)=>{
            console.log(result);
            setItemsInfo(result)
        })
        setChange(false)

            console.log(itemsInfo);
    }

    // if (change === true) {
    //     console.log('change detected and fetching');
    //     fetchProducts().then((result) => {
    //         console.log(result);
    //         setItemsInfo(result)
    //     })

    //     setChange(undefined)
    // }

    // const reRenderHandler = (changeDetected) => {
    //     console.log(changeDetected);
        
    //     if (changeDetected === true) {
    //         console.log('change detected and fetching');
    //         fetchProducts().then((result) => {
    //             console.log(result);
    //             setItemsInfo(result)
    //         })
    
    //         // setChange(undefined)
    //     }
    //     setChange(changeDetected)
    //     console.log(change); // false
    // }


    console.log(change);
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
        fetchProducts().then((result) => {
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
            {ctx.isAdmin  && <Upload onActionChange={reRenderHandler} />}
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

