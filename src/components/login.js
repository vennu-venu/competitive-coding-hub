import "../styles/login.css";
import { Link } from "react-router-dom";

function Login() {
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
