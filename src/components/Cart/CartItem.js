import classes from './CartItem.module.css';

export const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  console.log(props);

  return (
    <li className={classes['cart-item']}>
      <div>
          <img  className={classes.product} src={props.url} alt='product'></img>
      <div className={classes['product-info']}>

      
      <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
        </div>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <span className={classes.amount}>x {props.amount}</span>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};


