import "../styles/login.css";
import { Link } from "react-router-dom";

function Login() {
  let code1 = "// Moto of Competitive Coding Hub";
  let code2 = "if(doubtInCoding == true) {";
  let code3 = "  loginToCCH();";
  let code4 = "  postDoubt();";
  let code5 = "  getSolution();";
  let code6 = "}";

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
            name=""
            placeholder="Username"
            required
          />
          <input
            className="login-inp"
            type="password"
            name=""
            placeholder="Password"
            required
          />
          <input className="login-button" type="submit" name="" value="Login" />
        </form>

        <div>
          <p className="login-new-user">
            New to Competitive Coding Hub ?<Link className="sign-up-opt" to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;