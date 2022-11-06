import React from "react";
import "./Footer.css"

export default function Footer () {
    const src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2250.5583850969933!2d12.538587415860723!3d55.66188960646757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465253832f5f32f7%3A0xaeff0e7466c2981b!2sEnghavevej%2080c%2C%202450%20K%C3%B8benhavn!5e0!3m2!1sen!2sdk!4v1633368355628!5m2!1sen!2sdk"
    return (
        <footer className="footer" id="footer">

            <div className="footerAddressDiv">
                <div>
                    <div className="footerAddress">
                        <h3>Address:</h3>
                        <h4>Enghavevej 80c, 2450, København Denmark</h4>
                    </div>
                        
                    <div className="footerAddress">
                        <h3>CallUs: </h3>
                        <h4>+45 72345674, mealssharing@outlook.com</h4>
                    </div>
                    
                    <div className="footerAddress">
                        <h3>MailUs: </h3>
                        <h4>mealssharing@outlook.com</h4>
                    </div>
                </div>

                <div className="footerAddressIframe">
                    <iframe src={src} width="150" height="150" style={{border:"0"}} allowFullScreen="" loading="lazy"></iframe>
                </div>
            </div>
         
            
            <div className="copyright">
                <h5>Copyright:hyf@ShravyaGurmitkal@2022</h5>
            </div>
        </footer>
    )
}