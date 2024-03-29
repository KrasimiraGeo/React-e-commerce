import { useState} from "react"
import { CartProvider } from "../../store/CartProvider"
import { Gallery } from '../Shop/Gallery'
import { Header } from "../../components/ShopHeader/Header"
import { LoginForm } from "../../components/LoginForm/LoginForm"
import { Cart } from "../../components/Cart/Cart"
import { Footer } from "../../components/Footer/Footer"
import { About } from "../../components/About/About"


export const ShopPage = () => {

    const [change, setChange] = useState()

    const reRenderHandler = (changeDetected) => {
        setChange(changeDetected)
    }

    const [loginModalIsVisible, setLoginModalIsVisible] = useState(false)
    const [cartModalIsVisible, setCartModalIsVisible] = useState(false)
    const [orderModalIsVisible, setOrderModalIsVisible] = useState(false)
    const [aboutModalIsVisible, setAboutModalIsVisible] = useState(false)

    const showLoginModalHandler = () => {
        setLoginModalIsVisible(true)
        setCartModalIsVisible(false)
        setAboutModalIsVisible(false)

    }

    const hideLoginModalHandler = () => {
        setLoginModalIsVisible(false)
    }

    const showCartModalHandler = () => {
        setCartModalIsVisible(true)
        setLoginModalIsVisible(false)
        setAboutModalIsVisible(false)
    }

   
    const hideCartModalHandler = () => {
        setCartModalIsVisible(false)
    }

    const showOrderModalHandler = () => {
        setOrderModalIsVisible(true)
    }

    const showAboutHandler =()=>{
        setAboutModalIsVisible(true)
        setLoginModalIsVisible(false)
        setCartModalIsVisible(false)
    }

    const closeAboutHandler = () => {
        setAboutModalIsVisible(false)
    }

    return (
        <CartProvider>
            {loginModalIsVisible && <LoginForm onClose={hideLoginModalHandler} />}
            <Header onShowLogin={showLoginModalHandler} onShowCart={showCartModalHandler} />
            {cartModalIsVisible && <Cart onClose={hideCartModalHandler} onShowOrderForm={showOrderModalHandler}/>}
            <Gallery onDetectedChange={reRenderHandler} />
           <Footer/>
           {aboutModalIsVisible === true && <About />}
        </CartProvider>
    )
}

