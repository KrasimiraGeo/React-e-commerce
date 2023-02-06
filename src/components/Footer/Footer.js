import classes from './Footer.module.css'
import gmail from '../../assets/gmail-35.png'
import linkedin from '../../assets/linkedin-35.png'
import facebook from '../../assets/facebook-35.png'
import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { About } from '../About/About'
import { Modal } from '../Modal/Modal'

export const Footer = (props) => {

  console.log(props);

  let location = useLocation()
  const [aboutIsVisible, setAboutIsVisible] = useState(false)

  const aboutHandler = () => {
    setAboutIsVisible(true)

  }

  const getBackHandler = () => {
    setAboutIsVisible(false)
  
  }

  return (<Fragment>
    <footer className={classes.footer}>
      <Link to={`${location.pathname}/about`}>
        <button onClick={aboutHandler}>ABOUT</button>
      </Link>
      {aboutIsVisible === true && <About onBack={getBackHandler} />}
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

  )
}

