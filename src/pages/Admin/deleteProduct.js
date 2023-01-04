
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


    if(responseFromDB.ok && responseFromCloud.ok){
        console.log('Product was successfully deleted');
    } else if(responseFromDB.ok){
        console.log('Product details were deleted only from database');
    }else if(responseFromCloud.ok){
        console.log('Product image was deleted only from cloud storage');
    }


}