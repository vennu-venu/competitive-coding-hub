import "../styles/login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  let code1 = "// Moto of Competitive Coding Hub";
  let code2 = "if(doubtInCoding == true) {";
  let code3 = "  loginToCCH();";
  let code4 = "  postDoubt();";
  let code5 = "  getSolution();";
  let code6 = "}";

  const navigate = useNavigate();

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
      const userAccount = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      console.log(userAccount);
      navigate("/home");
    } catch (error) {
      console.log("Error in Login: ", error.message);
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

        <form className="login-form" action="" method="post">
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
          <input onClick={handleSubmit} className="login-button" type="submit" value="Login" />
        </form>

        <div>
          <p className="login-new-user">
            New to Competitive Coding Hub ?
            <Link className="sign-up-opt" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
