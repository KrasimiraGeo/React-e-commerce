import { Header } from "../../components/ShopHeader/Header"
import {FetchAllProducts} from '../Admin/operations/FetchAllProducts'
import { LoginForm } from "../../components/LoginForm/LoginForm"
import { Fragment } from "react"
// import { Item } from "../components/UI/Item"
export const ShopPage = () => {

    return (
        <Fragment>
            <LoginForm/>
            <Header />    
            <FetchAllProducts/>
        </Fragment>

    )
}