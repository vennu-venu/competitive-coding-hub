import "../styles/profile.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";
import axios from "axios";

function UpdateProfile() {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    async function verifyTokenAndGetUser(tokenObj) {
      try {
        const response = await axios.post(
          "https://competitive-coding-hub.herokuapp.com/update-profile/verify-and-get-user",
          tokenObj
        );
        if (!response.data.verification) {
          localStorage.removeItem("cch-user-token");
          navigate("/login");
        } else {
          setUser(response.data.user);
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
      verifyTokenAndGetUser(tokenObj);
    }
  }, [navigate]);

  function onHackerrankChange(e) {
    setUser({ ...user, hackerrank_id: e.target.value });
  }
  function onCodechefChange(e) {
    setUser({ ...user, codechef_id: e.target.value });
  }
  function onCodeforcesChange(e) {
    setUser({ ...user, codeforces_id: e.target.value });
  }
  function onLeetcodeChange(e) {
    setUser({ ...user, leetcode_id: e.target.value });
  }

  async function handleUpdate(field) {
    let fieldObj;
    if (field === "hackerrank_id") {
      fieldObj = { hackerrank_id: user.hackerrank_id };
    } else if (field === "codechef_id") {
      fieldObj = { codechef_id: user.codechef_id };
    } else if (field === "codeforces_id") {
      fieldObj = { codeforces_id: user.codeforces_id };
    } else {
      fieldObj = { leetcode_id: user.leetcode_id };
    }
    try {
      const response = axios.post(
        "https://competitive-coding-hub.herokuapp.com/update-profile/change",
        { ...fieldObj, email: user.email }
      );
      NotificationManager.success((await response).data.message);
    } catch (error) {
      console.log("Error in Updating Profile: ", error);
    }
  }

  return (
    <div>
      <div>
        <div className="profile-top-row">
          <div className="profile-count">
            <div className="profile-circle">
              <p className="profile-count-val">{user.no_of_posts}</p>
            </div>
            <p className="profile-post">Posts</p>
          </div>
          <div className="profile-names">
            <p className="profile-username">
              <span className="profile-custom-letter">@</span>
              {user.username}
            </p>
            <p className="profile-name">
              {user.first_name} {user.last_name}
            </p>
          </div>
        </div>
        <div className="profile-cards">
          <div className="profile-card">
            <p className="profile-card-title">
              <span className="profile-custom-letter">H</span>ackerrank
            </p>
            <input
              className="profile-card-inp"
              type="text"
              name="hackerrank_id"
              value={user.hackerrank_id}
              onChange={onHackerrankChange}
            />
            <button
              className="profile-card-button"
              onClick={() => handleUpdate("hackerrank_id")}
            >
              Update
            </button>
          </div>
          <div className="profile-card">
            <p className="profile-card-title">
              <span className="profile-custom-letter">C</span>odechef
            </p>
            <input
              className="profile-card-inp"
              type="text"
              name="codechef_id"
              value={user.codechef_id}
              onChange={onCodechefChange}
            />
            <button
              className="profile-card-button"
              onClick={() => handleUpdate("codechef_id")}
            >
              Update
            </button>
          </div>
          <div className="profile-card">
            <p className="profile-card-title">
              <span className="profile-custom-letter">C</span>odeforces
            </p>
            <input
              className="profile-card-inp"
              type="text"
              name="codeforces_id"
              value={user.codeforces_id}
              onChange={onCodeforcesChange}
            />
            <button
              className="profile-card-button"
              onClick={() => handleUpdate("codeforces_id")}
            >
              Update
            </button>
          </div>
          <div className="profile-card">
            <p className="profile-card-title">
              <span className="profile-custom-letter">L</span>eetcode
            </p>
            <input
              className="profile-card-inp"
              type="text"
              name="leetcode_id"
              value={user.leetcode_id}
              onChange={onLeetcodeChange}
            />
            <button
              className="profile-card-button"
              onClick={() => handleUpdate("leetcode_id")}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
