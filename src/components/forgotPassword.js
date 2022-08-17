import "../styles/login.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("cch-user-token") != null) {
      navigate("/home");
    }
  }, [navigate]);

  const [otpIsSent, setOtpisSet] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handleOTPInput = (e) => {
    setOtp(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordInput = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setFinalEmail(email);
    try {
      const response = await axios.post(
        "http://localhost:5000/forgot-password/send-otp",
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
        "http://localhost:5000/forgot-password/verify-otp",
        { email: finalEmail, otp: otp }
      );
      if (response.data.success) {
        NotificationManager.success(
          "You can change your password in 10 minutes",
          response.data.message
        );
        setOtpVerified(true);
        setToken(response.data.jwt);
      } else {
        NotificationManager.error(response.data.message);
      }
    } catch (error) {
      console.log("Error in Verifying OTP: ", error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/forgot-password/change-password",
        { password: password, confirmPassword: confirmPassword, token: token }
      );
      if(response.data.success) {
        NotificationManager.success(response.data.message);
        navigate("/login");
      }
      else {
        NotificationManager.error(response.data.message);
        navigate("/forgot-password");
      }
    } catch (error) {
      console.log("Error in Changing Password: ", error);
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
          <span className="login-custom-letter">C</span>hange Password
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

        {otpIsSent && !otpVerified ? (
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

        {otpVerified ? (
          <form
            className="login-form"
            style={{ marginTop: "20px" }}
            z
            onSubmit={handlePasswordChange}
          >
            <input
              className="login-inp"
              type="password"
              name="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
              value={password}
              onChange={handlePasswordInput}
              placeholder="Password"
              required
            />
            <input
              className="login-inp"
              type="password"
              name="cpassword"
              pattern={password}
              title="passwords don't match"
              value={confirmPassword}
              onChange={handleConfirmPasswordInput}
              placeholder="Confirm Password"
              required
            />
            <button className="login-button" type="submit">
              Change Password
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

export default ForgotPassword;
