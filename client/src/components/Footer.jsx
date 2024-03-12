import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
} from "react-icons/fa";
import { IoIosMail } from "react-icons/Io";
const Footer = () => {
  return (
    <>
      <section className="subscription">
        <div className="subscription-c1">
          <span>Get The Latest Deals And More</span>
          <span>NEW RELEASES,SPECIAL OFFER AND MORE</span>
        </div>
        <div className="subscription-c2">
          <div>
            <input type="email" name="" placeholder="Enter Your Email" id="" />
            <button type="submit">Subscribe</button>
          </div>
        </div>
      </section>
      <section className="footer">
        <div className="footer-main">
          <div className="footer-container">
            <div className="sec aboutus">
              <h2>About us</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium sed magni quos animi nisi enim nesciunt quasi odio
                ut possimus.
              </p>
              <ul className="footer-social">
                <li>
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                  </a>
                </li>
                <li>
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    <FaYoutube />
                  </a>
                </li>
              </ul>
            </div>
            <div className="sec quicklinks">
              <h2>Support</h2>
              <ul>
                <li>
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    Help
                  </a>
                </li>
                <li>
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="sec quicklinks">
              <h2>Shop</h2>
              <ul>
                <li>
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    Men
                  </a>
                </li>
                <li>
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    Women
                  </a>
                </li>
                <li>
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    Kids
                  </a>
                </li>
                <li>
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    Accessories
                  </a>
                </li>
              </ul>
            </div>
            <div className="sec contact">
              <h2>Contact Us</h2>
              <ul className="footer-info">
                <li>
                  <span>
                    <FaPhoneAlt />
                  </span>
                  <p>
                    <a href="tel:+12345678900">+1 234 567 8900</a>
                  </p>
                </li>
                <li>
                  <span>
                    <IoIosMail />
                  </span>
                  <p>
                    <a href="mailto:knowmore@nike.in">knowmore@nike.in</a>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="copyrightText">
            <p>Copyright ©2023 NIKE</p>
            <p>
              Made By{" "}
              <a
                href="https://www.linkedin.com/in/sumilsuthar/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sumil Suthar
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
// style="width: 40%;display: flex;"
