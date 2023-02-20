export const deleteProduct = async (product) => {
    const productKey = product.key
    const productUrl = product.imageUrl
  
    const dbUrl = `https://art-shop-37d63-default-rtdb.europe-west1.firebasedatabase.app/${productKey}.json`

    const responseFromDB = await fetch(dbUrl, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    })

    const responseFromCloud = await fetch(productUrl, {
        method: 'DELETE',
        header: {
            'content-type': 'application/json'
        }
    })

    return responseFromCloud, responseFromDB
}