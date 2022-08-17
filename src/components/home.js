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
      <ul className="topnav">
        <li>
          <a className="active" href="#home">
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
        <div className="home-counts">
          <div className="home-count1">
            <div className="home-countnumber">{count1}</div>
            <span className="home-countname">Doubts</span>
          </div>
          <div className="home-count2">
            <div className="home-countnumber">{count2}</div>
            <span className="home-countname">Articles</span>
          </div>
        </div>
        <div className="home-search">
          <div className="home-search-input">
            <input
              className="home-search-input"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="home-search-input">
            <input
              className="home-search-input"
              type="text"
              placeholder="Filter"
            />
          </div>
        </div>
      </div>
      <div className="home-row">
        <div className="home-profile">
          <Profile />
        </div>
        <div className="home-list-group">
          {list.map((obj) => (
            <div className="home-list">
              <Post {...obj} />
            </div>
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
