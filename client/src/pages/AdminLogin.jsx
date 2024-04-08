import { Link, useNavigate } from "react-router-dom";
import loginImage from "../Images/abc4.png";
import "../styles/auth.css";
import { useState } from "react";
import Axios from "../Axios";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setAdmin } = useAuth();
  const [user, setUser] = useState({ email: "", password: "", role: "admin" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.email === "" || user.password === "") {
        toast.error("Please provide email and password");
        return;
      }
      const response = await Axios.post("/adminLogin", user);
      console.log(response);

      if (response.data.success === true) {
        localStorage.setItem("jwtAdmin", "Bearer " + response.data.token);
        setAdmin(response.data.user);
        toast.success("Login successful. Access granted.");
        navigate("/admin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="login-page">
      <div className="login-div div1">
        <div className="login-box">
          <h1 className="login-heading">Log in to your account</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-div">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={(e) =>
                  setUser({ ...user, email: e.target.value.trim() })
                }
                placeholder="Enter your email"
              />
            </div>
            <div className="input-div">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, password: e.target.value.trim() })
                }
                name="password"
                placeholder="Enter your password"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="login-button"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="forget-button">
            <button onClick={() => console.log("forget password")}>
              Forget password?
            </button>
          </div>
        </div>
      </div>
      <div className="login-div div2">
        <img className="login-image-r" src={loginImage} alt="image" />
      </div>
    </div>
  );
};

export default AdminLogin;
