import "../styles/home.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    async function verifyToken(tokenObj) {
      try {
        const response = await axios.post(
          "http://localhost:5000/home/verify",
          tokenObj
        );
        if(response.data.success) {
          setUserEmail(response.data.email);
        }
        else {
          localStorage.removeItem("cch-user-token");
          navigate("/login")
        }
      } catch (error) {
        console.log("Error in Token Vefification: ", error);
      }
    }
    if (localStorage.getItem("cch-user-token") === null) {
      navigate("/login");
    } else {
      const tokenObj = {
        token: localStorage.getItem("cch-user-token"),
      };
      verifyToken(tokenObj);
    }
  }, [navigate]);

  const signOut = () => {
    localStorage.removeItem("cch-user-token");
    navigate("/");
  };

  return (
    /*<div>
      <h1 className="welcome">Hello {userEmail}</h1>
      <button className="sign-out-btn" onClick={signOut}>
        Sign Out
      </button>
    </div>*/
<ul class="topnav">
  <li><a class="active" href="#home">Competetive Coding Hub</a></li>
<div className="home-li"> 
  <li><a href="#home" >Posts</a></li>
  <li><a href="#news" >My Doubts</a></li>
  <li class="dropdown"><a href="#contact">Profile</a>
  <div class="dropdown-content">
      <a href="#">View Profile</a>
      <a href="#">Edit Profile</a>
      <a href="#">Change Password</a>
      <a href="#">Logout</a>
    </div>
  </li>
  </div>
</ul>
  );
}

export default Home;
