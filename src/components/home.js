import "../styles/home.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [count1, updateCount1] = useState(100);
  const [count2, updateCount2] = useState(200);
  const [count3, updateCount3] = useState(300);

  const list = ["List-1","List-2","List-3","List-4","List-5"]

  useEffect(() => {
    async function verifyToken(tokenObj) {
      try {
        const response = await axios.post(
          "http://localhost:5000/home/verify",
          tokenObj
        );
        if (response.data.success) {
          setUserEmail(response.data.email);
        } else {
          localStorage.removeItem("cch-user-token");
          navigate("/login");
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
    <div>
      <ul class="topnav">
        <li>
          <a class="active" href="#home">
            Competetive Coding Hub
          </a>
        </li>
        <div className="home-li">
          <li>
            <a href="#posts">Posts</a>
          </li>
          <li>
            <a href="#mydoubts">My Doubts</a>
          </li>
          <li>
            <a href="#profile">Profile</a>
          </li>
        </div>
      </ul>
      <div className="home-row">
        <div className="home-top-cols">
        <div className="home-count1">
          <div className="home-countnumber">{count1}</div>
          <span className="home-countname">Count-1</span>
        </div>
        <div className="home-count2">
          <div className="home-countnumber">{count2}</div>
          <span className="home-countname">Count-2</span>
        </div>
        <div className="home-count3">
          <div className="home-countnumber">{count3}</div>
          <span className="home-countname">Count-3</span>
        </div>
      </div>
        <div className="home-top-cols">
          <form>
            <input className="home-search-input" type="text" placeholder="Search" />
          </form>
        </div>
      </div>
      <div className="home-row">
        <div className="home-profile">Profile</div>
        <div className="home-list-group">
        {list.map((item)=>(
        <div className="home-list">{item}</div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Home;

/*<div>
      <h1 className="welcome">Hello {userEmail}</h1>
      <button className="sign-out-btn" onClick={signOut}>
        Sign Out
      </button>
    </div>*/
