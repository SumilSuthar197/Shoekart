import { Link, useLocation } from "react-router-dom";
import "../styles/auth.css";

const ErrorPage = () => {
  const { state } = useLocation();
  const { statusCode } = state || {};
  let title, msg;
  if (statusCode) {
    if (statusCode === 500) {
      title = "Internal Server Error";
      msg =
        "An unexpected error occurred while trying to process your request. Please try again later. If the problem persists, contact our support team.";
    } else if (statusCode === 502) {
      title = "Bad Gateway";
      msg =
        "The server received an invalid response from the upstream server while processing your request. Please try again later.";
    } else if (statusCode === 403) {
      title = "Forbidden";
      msg =
        "You don't have permission to access this resource. Please contact the administrator for more information.";
    } else if (statusCode === 404) {
      title = "Page Not Found";
      msg =
        "Sorry, we couldn't find this page. But don't worry, you can find plenty of other things on our homepage.";
    } else {
      title = "Something went wrong";
      msg =
        "An unexpected error occurred while trying to process your request. Please try again later. If the problem persists, contact our support team.";
    }
  }
  return (
    <section className="Error-cont">
      <div className="Error-div-center">
        <h2>
          {statusCode || "404"}
        </h2>
        <p className="Error-p1">
          {title || "Sorry, we couldn't find this page."}
        </p>
        <p className="Error-p2">
          {msg ||
            "But don't worry, you can find plenty of other things on our homepage."}
        </p>
        <Link to="/" className="Error-back-to-homepage">
          Back to homepage
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
