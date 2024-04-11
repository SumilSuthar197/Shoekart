import Header from "../components/Header";
import { FaRegMap, FaPhoneAlt, FaClock } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import ContactForm from "../components/ContactForm";

const ContactPage = () => {
  const combinedText = {
    text1: "#lets's_talk",
    text2: "Leave A Message, We love to hear from you!",
    url: "https://nike0197.netlify.app/assets/1-f4da6767.jpg",
  };
  return (
    <>
      <div>
        <Header combinedText={combinedText} />
      </div>
      <div className="contact-details">
        <div className="company-details">
          <span>GET IN TOUCH</span>
          <h2>Visit one of our agency location or contact us today</h2>
          <h3>Head Office</h3>
          <div className="contactAddress">
            <ul type="none">
              <li>
                <div>
                  <FaRegMap />
                </div>{" "}
                Linking Road, Bandra West
              </li>
              <li>
                <div>
                  <FiMail />
                </div>{" "}
                contactus@shoekart.com
              </li>
              <li>
                <div>
                  <FaPhoneAlt />
                </div>{" "}
                +91 1234567890
              </li>
              <li>
                <div>
                  <FaClock />
                </div>{" "}
                Monday to Saturday: 9:00am to 10:00pm
              </li>
            </ul>
          </div>
        </div>
        <div className="map">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.983463068892!2d72.83328527507607!3d19.064464682137803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c91130392c07%3A0x3c47bf391c8de931!2sThadomal%20Shahani%20Engineering%20College!5e0!3m2!1sen!2sin!4v1692991846645!5m2!1sen!2sin"
            height="450"
            style={{ border: "0", width: "-webkit-fill-available" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <ContactForm />
    </>
  );
};

export default ContactPage;
