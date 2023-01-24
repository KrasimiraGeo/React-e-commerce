import classes from './CartItem.module.css';
import closeIcon from '../../assets/close-20.png'

export const CartItem = (props) => {
  console.log(props.price);
  const productPrice = Number(props.price)
  const price = `$${productPrice}`;

  return (
    <li className={classes['cart-item']}>
      {/* <div className={classes.wrapper}>
      <img src={closeIcon}></img>
      </div> */}
      <div>
          <img  className={classes.product} src={props.url} alt='product'></img>
      <div className={classes['product-info']}>
      {/* <h2>{props.name}</h2> */}
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


