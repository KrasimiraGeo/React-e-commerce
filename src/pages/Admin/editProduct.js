
// will edit product info in admin actions
// also will have to update quantity after order 

import { Fragment, useRef } from "react";
import { Modal } from "../../components/Modal/Modal";

export const editProduct = async (product) => {

    console.log(product);

    const dbUrl=''

    // key and url can not be updated

    const productName = product.name
    const productDescription = product.description
    const productPrice = product.price
    const productQuantity = product.quantity

    return(
        <Fragment>
       
        </Fragment>
    )
    

}