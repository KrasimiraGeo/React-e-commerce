import classes from './Card.module.css';
import { useContext } from 'react';
import { CartContext } from '../store/cart-context';

export const Card = (props) => {

    const product = props.item
    console.log(product);

    const cartCtx = useContext(CartContext)
    
    const addItemHandler = (event)=>{
        event.preventDefault()
        cartCtx.addItem({
            id:product.key,
            name: product.name,
            url: product.imageUrl, 
            price: product.price,
            amount: 1
        })
    
    }

    
    
    return (
        <article key={product.key} className={classes.card}>
            <img src={product.imageUrl} alt="product"></img>
            <div className={classes.content}>
                <p>{product.description}</p>
                <p>{product.price}</p>
            </div>

            <div className={classes.centered}>
                <button className={classes['button-edit']} onClick={addItemHandler}>Add to cart</button>
            </div>
        </article>
    )
};

// {isAdmin &&
//                 <div className={classes.centered}>
//                     <button className={classes['button-edit']}>Edit</button>
//                     <button className={classes['button-edit']}>Delete</button>
//                 </div>
//             }

