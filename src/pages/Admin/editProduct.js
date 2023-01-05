
// will edit product info in admin actions
// also will have to update quantity after order 

// import { Fragment, useRef } from "react";
// import { Modal } from "../../components/Modal/Modal";

export const editProduct = async (product) => {

    const productKey = product.id
    console.log(product);

    const dbUrl=`https://art-shop-37d63-default-rtdb.europe-west1.firebasedatabase.app/${productKey}.json`

    const editedProduct = {
        description: product.description,
        imageUrl: product.url,
        name: product.name,
        price: product.price,
        quantity: product.quantity
    }

    const responseFromDB = await fetch(dbUrl, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(editedProduct)
    })

    if(responseFromDB.ok){
        console.log('Product details were successfully edited')
    }

}