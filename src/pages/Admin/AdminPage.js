import { Fragment } from "react"

import {Header} from '../../components/ShopHeader/Header'
import { FetchAllProducts } from "../Admin/operations/FetchAllProducts"
import { Upload } from "../Admin/operations/Upload"


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