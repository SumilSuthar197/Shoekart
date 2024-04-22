import { Link, useNavigate } from "react-router-dom";
import loginImage from "../Images/abc4.png";
import "../styles/auth.css";
import { useRef, useState } from "react";
import Axios from "../Axios";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const ForgetPasswordModal = ({ onClose }) => {
  const modelRef = useRef();
  const [email, setEmail] = useState("");
  const closeModal = (e) => {
    if (modelRef.current === e.target) {
      onClose();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email === "") {
        toast.error("Please provide email");
        return;
      }
      const response = await Axios.get(`/forgetpassword/${email}`);
      if (response.data.success === true) {
        toast.success(response.data.message);
        onClose();
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div ref={modelRef} onClick={closeModal} className="modal">
      <div className="modal-container">
        <div className="modal-content">
          <h2 className="login-subheading" style={{ marginTop: "0" }}>
            Forgot Password
          </h2>
          <p
            className="modal-description"
            style={{ color: "#777", margin: "0.5rem 0 0" }}
          >
            Enter your email address below and we'll send you a link to reset
            your password.
          </p>
          <form
            className="login-form"
            onSubmit={handleSubmit}
            style={{ margin: "0" }}
          >
            <div className="input-div">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="reset-pass-btn">
              <button
                className="login-button"
                type="button"
                style={{ width: "100%", margin: "0" }}
                onClick={onClose}
              >
                Close
              </button>
              <button
                className="login-button"
                style={{ width: "100%", margin: "0" }}
                type="submit" 
              >
                Rest Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [user, setUser] = useState({ email: "", password: "", role: "user" });
  const [showForgetPassword, setShowForgetPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.email === "" || user.password === "") {
        toast.error("Please provide email and password", {
          position: "bottom-right",
        });
        return;
      }
      const response = await Axios.post("/login", user);
      console.log(response);

      if (response.data.success === true) {
        localStorage.setItem("jwt", "Bearer " + response.data.token);
        setAuth(response.data.user);
        toast.success("Login successful. Access granted.", {
          position: "bottom-right",
        });
        navigate("/products");
      } else {
        toast.error(response.data.message, {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "bottom-right",
      });
    }
  };
  return (
    <div className="login-page">
      <div className="login-div div1">
        <div className="login-box">
          <h1 className="login-heading">Log in to your account</h1>
          <h2 className="login-subheading">
            Don&apos;t have an account?{" "}
            <Link className="signup-link" to="/signup">
              Sign up
            </Link>
          </h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-div">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>
            <div className="input-div">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                name="password"
                placeholder="Enter your password"
              />
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
          <div className="forget-button">
            <button onClick={() => setShowForgetPassword(true)} type="button">
              Forget password?
            </button>
          </div>
        </div>
      </div>
      <div className="login-div div2">
        <img className="login-image-r" src={loginImage} alt="image" />
      </div>
      {showForgetPassword && (
        <ForgetPasswordModal onClose={() => setShowForgetPassword(false)} />
      )}
    </div>
  );
};

export default LoginPage;
