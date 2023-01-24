import classes from './Gallery.module.css'
import { Fragment, useEffect, useState, useContext } from 'react'
import { Card } from '../../components/Card/Card'
import { fetchProducts } from './fetch'
import { AuthContext } from '../../store/auth-context'
import { Upload } from './Upload'
import { PhoneAuthProvider } from 'firebase/auth'

export const Gallery = (props) => {
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
    
    if(change === true){
        console.log('detected change');

        fetchProducts().then((result)=>{
            console.log(result);
            setItemsInfo(result)
        })
        setChange(false)

            console.log(itemsInfo);
    }

    console.log(change);
   
    useEffect(() => {
        fetchProducts().then((result) => {
            console.log(result);
            console.log('initial render');
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

