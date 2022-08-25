import "../styles/login.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("cch-user-token") != null) {
      navigate("/home");
    }
  }, [navigate]);

  let code1 = "// Moto of Competitive Coding Hub";
  let code2 = "if(doubtInCoding == true) {";
  let code3 = "  loginToCCH();";
  let code4 = "  postDoubt();";
  let code5 = "  getSolution();";
  let code6 = "}";

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://competitive-coding-hub.herokuapp.com/0/login/check",
        user
      );
      if (!response.data.success) {
        NotificationManager.error(
          response.data.message,
          "Unsuccessful Login",
          4000
        );
      } else {
        NotificationManager.success(response.data.message, "Welcome " + response.data.username);
        localStorage.setItem("cch-user-token", response.data.jwt);
        localStorage.setItem("cch-user-username", response.data.username);
        navigate("/home");
      }
    } catch (error) {
      console.log("Error in Login: ", error);
    }
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <div className="login-code">
          <p className="comment font">{code1}</p>
          <p className="font">{code2}</p>
          <p className="intend font">{code3}</p>
          <p className="intend font">{code4}</p>
          <p className="intend font">{code5}</p>
          <p>{code6}</p>
        </div>
      </div>
      <div className="login-right">
        <h1 className="login-title">
          <span className="login-custom-letter">L</span>ogin
        </h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="login-inp"
            type="text"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleInput}
            required
          />
          <input
            className="login-inp"
            type="password"
            name="password"
            value={user.password}
            onChange={handleInput}
            placeholder="Password"
            required
          />
          <button className="login-button" type="submit">
            Login
          </button>
        </form>

        <div className="user-opt">
          <p>
            New to Competitive Coding Hub ?
            <Link className="sign-up-opt" to="/register">
              Register
            </Link>
          </p>
        </div>

        <Link className="login-link-text" to="/verify-email">
          <button className="opt-button">Verify Email</button>
        </Link>

        <Link className="login-link-text" to="/forgot-password">
          <button className="opt-button">Forgot Password ? </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
