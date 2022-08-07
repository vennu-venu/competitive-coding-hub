import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

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
      const userAccount = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      console.log(userAccount);
      navigate("/home");
    } catch (error) {
      console.log("Error in Sign Up: ", error.message);
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
