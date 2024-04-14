import "../styles/contactpage.css";
import PropTypes from "prop-types";

const Header = (props) => {
  const { text1, text2 } = props.combinedText;
  return (
    <div
      className="Header_title"
      style={{
        backgroundImage: `url("/src/Images/1.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <h1>{text1}</h1>
      <h2>{text2}</h2>
    </div>
  );
};

Header.propTypes = {
  combinedText: PropTypes.shape({
    text1: PropTypes.string.isRequired,
    text2: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
