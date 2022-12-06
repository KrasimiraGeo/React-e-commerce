import classes from './Card.module.css';
import { useContext } from 'react';
import { CartContext } from '../../store/cart-context';
import { AuthContext } from '../../store/auth-context';
import { Fragment } from 'react';

export const Card = (props) => {

    const product = props.item
    console.log(product);
    const authCtx = useContext(AuthContext)
    const cartCtx = useContext(CartContext)

    const addItemHandler = (event) => {
        event.preventDefault()
        cartCtx.addItem({
            id: product.key,
            name: product.name,
            url: product.imageUrl,
            price: product.price,
            amount: 1
        })

    }

    const editItemHandler = (event) => {

    }

    const deleteItemHandler = (event) => {
        event.preventDefault()
        
        console.log(product);

        }


    return (
        <Fragment>
            <article key={product.key} className={classes.card}>
                <img src={product.imageUrl} alt="product"></img>
                <div className={classes.content}>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                </div>
                <div className={classes.centered}>
                    {!authCtx.isAdmin && <button className={classes['button-edit']} onClick={addItemHandler}>Add to cart</button>}
                    {authCtx.isAdmin && <button className={classes['button-edit']} onClick={editItemHandler}>Edit</button>}
                    {authCtx.isAdmin && <button className={classes['button-edit']} onClick={deleteItemHandler}>Delete</button>}
                </div>

            </article>
        </Fragment>
    )
};



