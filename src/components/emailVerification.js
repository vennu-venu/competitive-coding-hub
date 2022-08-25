import "../styles/login.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";
import axios from "axios";

function EmailVerification() {
  const navigate = useNavigate();

  const [otpIsSent, setOtpisSet] = useState(false);
  const [finalEmail, setFinalEmail] = useState("");

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

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handleOTPInput = (e) => {
    setOtp(e.target.value);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setFinalEmail(email);
    try {
      const response = await axios.post(
        "https://competitive-coding-hub.herokuapp.com/0/verify-email/send-otp",
        { email: email }
      );
      if (response.data.success) {
        NotificationManager.success(
          "OTP expires in 5 minutes",
          response.data.message
        );
        setOtpisSet(true);
      } else {
        NotificationManager.error(response.data.message);
      }
    } catch (error) {
      console.log("Error in Sending OTP: ", error);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://competitive-coding-hub.herokuapp.com/0/verify-email/verify-otp",
        { email: finalEmail, otp: otp }
      );
      if (response.data.success) {
        NotificationManager.success(response.data.message, "Welcome" + response.data.username);
        localStorage.setItem("cch-user-token", response.data.jwt);
        localStorage.setItem("cch-user-username", response.data.username);
        navigate("/home");
      } else {
        NotificationManager.error(response.data.message);
      }
    } catch (error) {
      console.log("Error in Verifying OTP: ", error);
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
          <span className="login-custom-letter">E</span>mail Verification
        </h1>

        {!otpIsSent ? (
          <form className="login-form" onSubmit={handleEmailSubmit}>
            <input
              className="login-inp"
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailInput}
              required
            />
            <button className="login-button" type="submit">
              Send OTP
            </button>
          </form>
        ) : (
          ""
        )}

        {otpIsSent ? (
          <form
            className="login-form"
            style={{ marginTop: "20px" }}
            z
            onSubmit={handleOTPSubmit}
          >
            <input
              className="login-inp"
              type="text"
              name="otp"
              placeholder="OTP"
              value={otp}
              onChange={handleOTPInput}
              required
            />
            <button className="login-button" type="submit">
              Verify OTP
            </button>
          </form>
        ) : (
          ""
        )}

        <div className="user-opt">
          <p>
            Go back to
            <Link className="login-opt" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
