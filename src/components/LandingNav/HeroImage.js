import { Fragment } from 'react'
import image from '../../assets/sky.jpg'
import classes from './HeroImage.module.css'

export const HeroImage = () => {

    return (
        <Fragment>
        
        <div className={classes.bg}>
            <img src={image} alt='Sky'></img>
            <h1 className={classes.centered}>SKY</h1>
        </div>
        <div className={classes.background}></div>
        
       
        </Fragment>

    )
}