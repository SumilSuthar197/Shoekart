import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
} from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";
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
                  <Link to="/" target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                  </Link>
                </li>
                <li>
                  <Link to="/" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </Link>
                </li>
                <li>
                  <Link to="/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </Link>
                </li>
                <li>
                  <Link to="/" target="_blank" rel="noopener noreferrer">
                    <FaYoutube />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="sec quicklinks">
              <h2>Support</h2>
              <ul>
                <li>
                  <Link to="/" target="_blank" rel="noopener noreferrer">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/" target="_blank" rel="noopener noreferrer">
                    Help
                  </Link>
                </li>
                <li>
                  <Link to="/" target="_blank" rel="noopener noreferrer">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="sec quicklinks">
              <h2>Shop</h2>
              <ul>
                <li>
                  <Link to="/" target="_blank" rel="noopener noreferrer">
                    Men
                  </Link>
                </li>
                <li>
                  <Link to="/" target="_blank" rel="noopener noreferrer">
                    Women
                  </Link>
                </li>
                <li>
                  <Link to="/" target="_blank" rel="noopener noreferrer">
                    Kids
                  </Link>
                </li>
                <li>
                  <Link to="/" target="_blank" rel="noopener noreferrer">
                    Accessories
                  </Link>
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
                    <Link to="tel:+12345678900">+1 234 567 8900</Link>
                  </p>
                </li>
                <li>
                  <span>
                    <IoIosMail />
                  </span>
                  <p>
                    <Link to="mailto:knowmore@shoekart.in">
                      knowmore@shoekart.in
                    </Link>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="copyrightText">
            <p>Copyright ©{new Date().getFullYear()} Shoekart</p>
            <p>
              Made By{" "}
              <Link
                to="https://sumilsuthar.me/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sumil Suthar
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
// style="width: 40%;display: flex;"
