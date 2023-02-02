import { useState} from "react"
import { CartProvider } from "../../store/CartProvider"
import { Gallery } from '../Shop/Gallery'
import { Header } from "../../components/ShopHeader/Header"
import { LoginForm } from "../../components/LoginForm/LoginForm"
import { Cart } from "../../components/Cart/Cart"
import { Footer } from "../../components/Footer/Footer"


export const ShopPage = () => {

    const [change, setChange] = useState()

    const reRenderHandler = (changeDetected) => {
        setChange(changeDetected)
    }

    const [loginModalIsVisible, setLoginModalIsVisible] = useState(false)
    const [cartModalIsVisible, setCartModalIsVisible] = useState(false)
    const [orderModalIsVisible, setOrderModalIsVisible] = useState(false)

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

    const showOrderModalHandler = () => {
        setOrderModalIsVisible(true)
    }

    return (
        <CartProvider>
            {loginModalIsVisible && <LoginForm onClose={hideLoginModalHandler} />}
            <Header onShowLogin={showLoginModalHandler} onShowCart={showCartModalHandler} />
            {cartModalIsVisible && <Cart onClose={hideCartModalHandler} onShowOrderForm={showOrderModalHandler}/>}
            <Gallery onDetectedChange={reRenderHandler} />
            <Footer/>
        </CartProvider>
    )
}

