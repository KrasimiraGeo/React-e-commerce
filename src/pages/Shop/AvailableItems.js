import { useEffect, useState } from "react"

import { storage } from '../../FirebaseConfig/config'
import { ref, listAll,getDownloadURL } from "firebase/storage"
import { Card } from "../../components/UI/Card/Card"

export const AvailableItems = () => {

    const [imageList, setImageList] =useState([])
    const imageListRef = ref(storage, 'images/')
    const loaded=[]
    // const loadedImages = [
    //     {
    //         id: 'id1',
    //         quantity: '4',
    //         size: '100x100',
    //         price: '20lv'
    //     },
    //     {
    //         id: 'id3',
    //         quantity: '2',
    //         size: '1020x1030',
    //         price: '20lv'
    //     },
    //     {
    //         id: 'id4',
    //         quantity: '1',
    //         size: '100x100',
    //         price: '20lv'
    //     }

    // ]

    useEffect(()=>{
        listAll(imageListRef).then((response) => {
            console.log(response.items);
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    loaded.push({
                        imgUrl: url
                    })
                    console.log(loaded);
                })
            })
        })
    })


    return (
         <Card details={loaded}/>
    )
}

