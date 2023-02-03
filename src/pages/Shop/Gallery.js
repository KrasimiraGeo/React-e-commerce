import classes from './Gallery.module.css'
import { Fragment, useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../store/auth-context'
import { Card } from '../../components/Card/Card'
import { fetchProducts } from '../Admin/fetch'
import { Upload } from '../Admin/Upload'


export const Gallery = () => {
    const ctx = useContext(AuthContext)
    const [change, setChange] = useState()
    const [itemsInfo, setItemsInfo] = useState([])

    const reRenderHandler = (changeDetected) => {
        setChange(changeDetected)
   }

    if(change === true){
        fetchProducts().then((result)=>{
            setItemsInfo(result)
        })
        setChange(false)
    }

    useEffect(() => {
        fetchProducts().then((result) => {
            setItemsInfo(result)
        })
    }, [])

    
    return (
        <Fragment>
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

