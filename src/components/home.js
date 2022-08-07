import auth from "../firebase-config";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {

  const navigate = useNavigate();

  const signOut = async() => {
    auth.signOut();
    navigate("/");
  }

  return (
    <div>
      <h1 className="welcome">Hello {auth.currentUser.email}</h1>
      <button onClick={signOut} className="sign-out-btn">Sign Out</button>
    </div>
  );
}

export default Home;
