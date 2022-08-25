import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css";
import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";
import axios from "axios";

function Register() {

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("cch-user-token") != null) {
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
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
    isVerified: false,
    no_of_posts: 0
  });
  let name, value;

  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://competitive-coding-hub.herokuapp.com/register/create",
        user
      );

      if (!response.data.success) {
        NotificationManager.error(
          response.data.message,
          "Couldn't create Account !!",
          4000
        );
      } else {
        NotificationManager.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log("Error in Register: ", error);
    }
  };
  return (
    <div className="register-main">
      <div className="register-left">
        <div className="register-code">
          <p className="comment font">{code1}</p>
          <p className="font">{code2}</p>
          <p className="intend font">{code3}</p>
          <p className="intend font">{code4}</p>
          <p className="intend font">{code5}</p>
          <p>{code6}</p>
        </div>
      </div>
      <div className="register-right">
        <h1 className="register-title">
          <span className="register-custom-letter">R</span>egister
        </h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            pattern="[A-Za-z]{3,}"
            title="Three or more characters"
            value={user.first_name}
            onChange={handleInput}
            placeholder="First Name"
            required
            className="register-inp"
          />
          <input
            type="text"
            name="last_name"
            pattern="[A-Za-z]{3,}"
            title="Three or more characters"
            value={user.last_name}
            onChange={handleInput}
            placeholder="Last Name"
            required
            className="register-inp"
          />
          <input
            className="register-inp"
            type="text"
            name="username"
            pattern=".{8,}"
            title="Eight or more characters"
            value={user.username}
            onChange={handleInput}
            placeholder="User Name"
            required
          />
          <input
            className="register-inp"
            type="email"
            name="email"
            value={user.email}
            onChange={handleInput}
            placeholder="Email"
            required
          />
          <input
            className="register-inp"
            type="password"
            name="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
            value={user.password}
            onChange={handleInput}
            placeholder="Password"
            required
          />
          <input
            className="register-inp"
            type="password"
            name="cpassword"
            pattern={user.password}
            title="passwords don't match"
            value={user.cpassword}
            onChange={handleInput}
            placeholder="Confirm Password"
            required
          />
          <button className="register-button" type="submit">
            Register
          </button>
        </form>
        <div>
          <p className="register-had-account">
            Already have an account ?
            <Link className="login-opt" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
