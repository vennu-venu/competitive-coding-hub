import "../styles/home.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Post from "./post";
import Profile from "./profile";

function Home() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [count1, updateCount1] = useState(100);
  const [count2, updateCount2] = useState(200);

  const list = [
    {
      id: "1",
      title: "ABC",
      postedBy: "Ram",
      date: "4th dec 2021",
      question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, nobis.",
      replies: "5",
    },
    {
      id: "1",
      title: "ABC",
      postedBy: "Ram",
      date: "4th dec 2021",
      question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, nobis dgdgdg shdggd hdghd.",
      replies: "5",
    },
    {
      id: "1",
      title: "ABC",
      postedBy: "Ram",
      date: "4th dec 2021",
      question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, nobis.",
      replies: "5",
    },
    {
      id: "1",
      title: "ABC",
      postedBy: "Ram",
      date: "4th dec 2021",
      question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, nobis.",
      replies: "5",
    },
    {
      id: "1",
      title: "ABC",
      postedBy: "Ram",
      date: "4th dec 2021",
      question:
        "Lorem ipsum dolor bbbbbbbbb hhhhhhhhhh jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj jjjjjjjjj jjjjjjjj jjjjjjjjj hdhhd hdhhd vsfgfd jjjjj jjjjjjjjjjjj sit amet consectetur adipisicing elit. Id, nobis.",
      replies: "5",
    },
  ];

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
    <div className="home-container">
      <div className="home-row">
        <div className="home-title">
          <span className="home-first-letter">C</span>ompetetive{" "}
          <span className="home-first-letter">C</span>oding{" "}
          <span className="home-first-letter">H</span>ub
        </div>
        <div className="home-buttons">
          <div className="home-btn home-post">Posts</div>
          <div className="home-btn home-doubt">Doubts</div>
          <div className="dropdown">
            <div className="home-btn home-pro dropbtn">Profile</div>
            <div class="dropdown-content">
              <a href="#">View Profile</a>
              <a href="#">Edit Profile</a>
              <a href="#">Change Password</a>
            </div>
          </div>
        </div>
      </div>
      <div className="home-row">
        <div className="home-counts">
          <div className="home-count1">
            <div className="home-countnumber">{count1}</div>
            <span className="home-countname">Total Doubts</span>
          </div>
        </div>
        <div className="home-search">
          <form>
            {" "}
            <input
              className="home-search-input"
              type="text"
              placeholder="Search"
            ></input>
            <button className="home-search-btn" type="submit">
              <FaSearch style={{ color: "green" }} />
            </button>{" "}
          </form>
        </div>
      </div>
      <div className="home-row">
        {list.map((obj) => (
          <div className="home-list">
            <Post {...obj} />
          </div>
        ))}
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
