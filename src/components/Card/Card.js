import classes from './Card.module.css';
import sky from '../../../assets/sky.jpg'
import { Fragment } from 'react';

export const Card = props => {

    console.log(props.details)
    const itemsUrl=[]
    const itemsInfo = props.details.map((imgUrl) => {
        console.log(imgUrl.imgUrl);
       itemsUrl.push(imgUrl.imgUrl)
    })

    console.log(itemsUrl);

    // console.log(props.details);
    return (
        <Fragment>
            <div className={classes.cards}>
                {itemsUrl && itemsUrl.map((url) => {
                    return (
                        <article className={classes.card}>
                            <img src={url} alt="product image"></img>
                            <div className={classes.content}>
                                <p>Short content.</p>
                            </div>
                            <footer>
                                <button className={classes.btn}>
                                    Add to cart
                                </button>
                            </footer>
                        </article>
                    )
                })}



            </div>


            {/* <article className={classes.card}>
                <header>
                    <h2>A short heading</h2>
                </header>
                <img src={sky} alt="Hot air balloons" />
                <div class={classes.content}>
                    <p>Short content.</p>
                </div>
                <footer>
                <button className={classes.btn}>
                        Add to cart
                    </button>
                </footer>
            </article>

            <article className={classes.card}>
                <header>
                    <h2>A short heading</h2>
                </header>
                <img src={sky} alt="Hot air balloons" />
                <div class={classes.content}>
                    <p>Short content.</p>
                </div>
                <footer>
                <button className={classes.btn}>
                        Add to cart
                    </button>
                </footer>
            </article>

            <article className={classes.card}>
                <header>
                    <h2>A short heading</h2>
                </header>
                <img src={sky} alt="Hot air balloons" />
                <div class={classes.content}>
                    <p>Short content.</p>
                </div>
                <footer>
                <button className={classes.btn}>
                        Add to cart
                    </button>
                </footer>
            </article>  */}
            {/* </div> */}
        </Fragment>

    )
};

