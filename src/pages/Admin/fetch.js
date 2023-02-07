import { useState } from "react"


export const fetchProducts = async () => {
    const dbUrl = 'https://art-shop-37d63-default-rtdb.europe-west1.firebasedatabase.app/.json'

    const loadedProducts = []
   

    const response = await fetch(dbUrl)
    if (!response.ok) {
        throw new Error('Something went wrong')
    }
    const data = await response.json()
  
    if(data===null){
    return
    }

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

    return loadedProducts

}