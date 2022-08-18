import "../styles/profile.css";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    async function verifyToken(tokenObj) {
      try {
        const response = await axios.post(
          "http://localhost:5000/profile/verify",
          tokenObj
        );
        if(!response.data.success) {
          localStorage.removeItem("cch-user-token");
          navigate("/login");
        }
        else {
          setEmail(response.data.email);
        }
      } catch (error) {
        console.log("Error in Token Vefification: ", error);
      }
    }

    async function getUserDetails() {
      try {
        const response = await axios.get(
          `http://localhost:5000/profile/get-user/${username}`
        );
        setUser(response.data.user);
      } catch (error) {
        console.log("Error in getting user data: ", error);
      }
    }

    if (localStorage.getItem("cch-user-token") === null) {
      navigate("/login");
    } else {
      const tokenObj = {
        token: localStorage.getItem("cch-user-token"),
      };
      verifyToken(tokenObj);
      getUserDetails();
    }
  }, [navigate, username]);

  return (
    <div>
      <div className="profile-top-row">
        <div className="profile-count">
          <div className="profile-circle">
            <p className="profile-count-val">{user.no_of_posts}</p>
          </div>
          <p className="profile-post">Posts</p>
        </div>
        <div className="profile-names">
          <p className="profile-username">{user.username}</p>
          <p className="profile-name">{user.first_name} {user.last_name}</p>
        </div>
      </div>
      <div className="profile-cards">
        <div className="profile-card">
          <p className="profile-card-title"><span className="profile-custom-letter">E</span>mail</p>
          <p className="profile-card-val">{user.email}</p>
          {email !== user.email ? <a className="profile-card-button" href={"https://mail.google.com/mail/?view=cm&fs=1&to=" + user.email} target="_blank" rel="noopener noreferrer">Send Gmail</a>: ""}
        </div>
        {user.hackerrank_id && <div className="profile-card">
          <p className="profile-card-title"><span className="profile-custom-letter">H</span>ackerrank</p>
          <p className="profile-card-val">{user.hackerrank_id}</p>
          <a className="profile-card-button" href={"https://www.hackerrank.com/" + user.hackerrank_id} target="_blank" rel="noopener noreferrer">Hackerrank Profile</a>
        </div>}
        {user.codechef_id && <div className="profile-card">
          <p className="profile-card-title"><span className="profile-custom-letter">C</span>odechef</p>
          <p className="profile-card-val">{user.codechef_id}</p>
          <a className="profile-card-button" href={"https://www.codechef.com/users/" + user.codechef_id} target="_blank" rel="noopener noreferrer">Codechef Profile</a>
        </div>}
        {user.codeforces_id && <div className="profile-card">
          <p className="profile-card-title"><span className="profile-custom-letter">C</span>odeforces</p>
          <p className="profile-card-val">{user.codeforces_id}</p>
          <a className="profile-card-button" href={"https://codeforces.com/profile/" + user.codeforces_id} target="_blank" rel="noopener noreferrer">Codeforces Profile</a>
        </div>}
        {user.leetcode_id && <div className="profile-card">
          <p className="profile-card-title"><span className="profile-custom-letter">L</span>eetcode</p>
          <p className="profile-card-val">{user.leetcode_id}</p>
          <a className="profile-card-button" href={"https://leetcode.com/" + user.leetcode_id} target="_blank" rel="noopener noreferrer">Leetcode Profile</a>
        </div>}
      </div>
    </div>
  );
}

export default Profile;
