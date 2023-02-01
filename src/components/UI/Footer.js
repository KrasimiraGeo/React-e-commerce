import classes from './Footer.module.css'
import gmail from '../../assets/gmail-35.png'
import linkedin from '../../assets/linkedin-35.png'
import facebook  from '../../assets/facebook-35.png'
import { Fragment } from 'react'

export const Footer = () => (

 <Fragment>
     
    <footer className={classes.footer}>
    
    <button>ABOUT</button>
    
    <div className={classes.wrapper}>
        <img src={gmail} alt='gmail'></img>
        <img src={linkedin} alt='linkedin'></img>
        <img src={facebook} alt='facebook'></img>
    </div>
    <div className={classes.text}>
    <p>Krasimira Georgieva</p>
    <p>Copyright &copy; {new Date().getFullYear()} SKY</p>
    </div>
    
  </footer>

    </Fragment>
  
  
);

