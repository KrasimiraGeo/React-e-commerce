import { useEffect, useState } from "react"


export const Download = () => {

    const getUrl = 'https://art-shop-37d63-default-rtdb.europe-west1.firebasedatabase.app/.json'

    const [itemsInfo, setItemsInfo] = useState([])

    useEffect(()=>{
        const fetchItems = async() => {
            const response = await fetch(getUrl)
        
            if(!response.ok){
                throw new Error('something went wrong')
            }

            const data = await response.json()
            const loadedItems = []

            for (const key in data){
                console.log(key);
                loadedItems.push({
                    key
                })
            }

            setItemsInfo(loadedItems)
        }

        fetchItems().catch((error) => {
            console.log(error.message);
        })
    },[])

    console.log(itemsInfo);
}