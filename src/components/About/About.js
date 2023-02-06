import { Modal } from "../Modal/Modal"
import classes from './About.module.css'
import about from '../../assets/cut.jpg'

export const About = (props) => {

    console.log(props);
    return (
        <Modal id='about' onClose={props.onBack}>
            <section id="about-us">
                <div className={classes.banner}>
                    <h2>About SKY</h2>
                </div>
                <div className={classes["grid-container"]}>
                    <img src={about} alt="About Us Image" />
                    <div className={classes.text}>
                        <p>
                            SKY aims to bring the beauty of the real sky indoors with stunning wall murals,
                            art wallpapers and high-scale canvas prints.
                        </p>
                        <p>
                            The selection, varying from vibrant sunsets to moody storm clouds,
                            is sourced direclty from the sky above, thus every scene is unique.
                        </p>
                        <p>
                            Bring a touch of nature to elevate your space with breathtaking views of the sky.
                        </p>
                    </div>
                </div>
            </section>
        </Modal>
    )
}
