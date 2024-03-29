import classes from './Cart.module.css'
import { Fragment, useContext, useState } from "react"
import { Link, useLocation} from "react-router-dom"
import { useHistory } from "react-router-dom"
import { Modal } from "../Modal/Modal"
import { CartItem } from "./CartItem"
import { OrderForm } from "../OrderForm/OrderForm"
import { EmptyCart } from "./EmptyCart"
import { SmallCartIcon } from "../UI/SmallIcons"
import { CartContext } from "../../store/cart-context"

export const Cart = (props) => {

    let location = useLocation()
    const history = useHistory()
    const [order, setOrder] = useState(false)
    const cartCtx = useContext(CartContext)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    }

    const cartItems = <ul className={classes["cart-items"]}>
        {cartCtx.items.map((item) =>
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                url={item.url}
                onRemove={cartItemRemoveHandler.bind(null, item.id)} 
                onAdd={cartItemAddHandler.bind(null, item)} 
            />
        )}
    </ul>

    const fullCart = cartItems.props.children.length === 0 || cartItems.props.children.length === undefined ? false : true
   
    const orderHandler = (event) => {
        event.preventDefault()
        setOrder(true)
    }

    const getBackHandler = () => {
        setOrder(false)
    }

    return (
        <Fragment>
            {order === false && <Modal onClose={props.onClose} >
                {fullCart === true && <SmallCartIcon />}
                <div>{cartItems}</div>

                {fullCart === true && <div className={classes.total}>
                    <span>Total amount</span>
                    <span>{totalAmount}</span>
                </div>}
                
                {fullCart === false && <EmptyCart />}
                <div className={classes.actions}>
                    {hasItems && <button className={classes.order} onClick={orderHandler}><Link to={`${location.pathname}/order`}>
                    Order
                    </Link></button>}
                   
                </div>
            </Modal>}
            {order === true &&
                <Modal onClose={props.onClose}>
                    <OrderForm onBack={getBackHandler}/>
                </Modal>
            }

        </Fragment>

    )
}