import classes from './CartItem.module.css';

export const CartItem = (props) => {
  const productPrice = Number(props.price)
  const price = `$${productPrice}`;

  return (
    <li className={classes['cart-item']}>
      <div>
          <img  className={classes.product} src={props.url} alt='product'></img>
      <div className={classes['product-info']}>
        </div>
      </div>
      <p className={classes.price}>{price}</p>
      <div className={classes.actions}>
      
        <button onClick={props.onRemove}>−</button>
        <span className={classes.amount}>x {props.amount}</span>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};


