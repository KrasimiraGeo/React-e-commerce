import { Fragment } from "react"

import {Header} from '../../components/UI/ShopHeader/Header'
import { FetchAllProducts } from "./FetchAllProducts"
import { Upload } from "./Upload"


// TODO: 
// change the navigation menu options based on the login

export const AdminPage = () => {
    return(
        <Fragment>
            <Header/>
            <Upload/>
            <FetchAllProducts/>
        </Fragment>
    )
}