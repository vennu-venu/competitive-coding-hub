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
    <div className="main">
      <form className="box" action="" method="post">
        <h1>Login</h1>
        <input type="text" name="" placeholder="Username" required />
        <input type="password" name="" placeholder="Password" required />
        <input type="submit" name="" value="Login" />
        <div>
          <p>New to Competitive Coding Hub ?</p>
          <Link to="/register">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
