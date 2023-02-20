export const editProduct = async (product) => {

    const productKey = product.id
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

    return responseFromDB

}