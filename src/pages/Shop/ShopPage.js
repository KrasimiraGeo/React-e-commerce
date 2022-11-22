import { Header } from "../../components/ShopHeader/Header"
import { FetchAllProducts } from '../Admin/FetchAllProducts'
import { LoginForm } from "../../components/LoginForm/LoginForm"
import { Cart } from "../../components/Cart/Cart"

import {  useState } from "react"
import { CartProvider } from "../../components/store/CartProvider"

export const ShopPage = () => {

    const [loginModalIsVisible, setLoginModalIsVisible] = useState(false)
    const [cartModalIsVisible, setCartModalIsVisible] = useState(false)

    const showLoginModalHandler = () => {
        setLoginModalIsVisible(true)
    }

    const hideLoginModalHandler = () => {
        setLoginModalIsVisible(false)
    }

    const showCartModalHandler = () => {
        setCartModalIsVisible(true)
    }

    const hideCartModalHandler = () => {
        setCartModalIsVisible(false)

    }

    return (
        <CartProvider>
            {loginModalIsVisible && <LoginForm onClose={hideLoginModalHandler}/>}
            <Header onShowLogin={showLoginModalHandler} onShowCart={showCartModalHandler}/>
            {cartModalIsVisible && <Cart onClose={hideCartModalHandler}/>}
            <FetchAllProducts />
        </CartProvider>

    )
}

// showmodal should be called when account button is clicked; the button is in header; we should expect the function call inside the header comp - pass a pointer to the function down to the component