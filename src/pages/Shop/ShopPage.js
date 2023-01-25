import { Header } from "../../components/ShopHeader/Header"
import { Gallery } from '../Shop/Gallery'
import { LoginForm } from "../../components/LoginForm/LoginForm"
import { Cart } from "../../components/Cart/Cart"

import { useState} from "react"
import { CartProvider } from "../../store/CartProvider"
import { OrderForm } from "../../components/OrderForm/OrderForm"


export const ShopPage = (props) => {

    const [change, setChange] = useState()

    const reRenderHandler = (changeDetected) => {
        console.log(change);  
        setChange(changeDetected)
        console.log(change); 
    }

    console.log(change); // true

    const [loginModalIsVisible, setLoginModalIsVisible] = useState(false)
    const [cartModalIsVisible, setCartModalIsVisible] = useState(false)
    const [orderModalIsVisible, setOrderModalIsVisible] = useState(false)

    // const ctx = useContext(AuthContext)

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

    const hideOrderModalHandler = () => {
        setOrderModalIsVisible(false)
    }

    return (
        <CartProvider>
            {loginModalIsVisible && <LoginForm onClose={hideLoginModalHandler} />}
            <Header onShowLogin={showLoginModalHandler} onShowCart={showCartModalHandler} />
            {cartModalIsVisible && <Cart onClose={hideCartModalHandler} onShowOrderForm={showOrderModalHandler}/>}
            {/* {orderModalIsVisible && <OrderForm onClose={hideOrderModalHandler}/>} */}
            <Gallery onDetectedChange={reRenderHandler} />
        </CartProvider>
    )
}

