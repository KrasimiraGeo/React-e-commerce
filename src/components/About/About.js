import { Modal } from "../Modal/Modal"
import classes from './About.module.css'
import about from '../../assets/cut.jpg'

export const About = (props) => {

    return (
        <Modal onClose={props.onBack}>
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
                            Bring a touch of nature to elevate your space with these breathtaking views of the sky.
                        </p>

                    </div>
                </div>
            </section>
        </Modal>
    )
}


// Transform your walls into a picturesque view of the sky with our stunning wall murals and art wallpapers.
//  Whether you want to create a peaceful atmosphere in your home or add a touch of beauty to your office, 
//  our designs featuring the sky and clouds will bring a touch of nature indoors. From vibrant sunsets to moody storm clouds, 
//  our selection has something for everyone. Our high-quality wall murals are easy to install and made to last, so you can enjoy your drea
//  m view of the sky for years to come. Elevate your space with our beautiful art wallpapers today.


// Bring the beauty of the sky indoors with our stunning wall murals and art wallpapers. 
// Our designs featuring clouds and the sky will transform your space into a peaceful escape. 
// From vibrant sunsets to moody storm clouds, our high-quality wall murals are easy to install and made to last. 
// Elevate your walls with our breathtaking views of the sky.