import "../styles/newPost.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";
import axios from "axios";

function NewPost() {
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    problem_link: "",
    problem_desc: "",
    code: "",
    time: "",
    user: "Unknown",
    replies: [],
  });
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPost({ ...post, [name]: value });
  };

  const handleAnonymousChange = () => {
    setIsAnonymous(!isAnonymous);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postDetails = { ...post, isAnonymous: isAnonymous, time: Date.now() };
    try {
      const response = await axios.post(
        "https://competitive-coding-hub.herokuapp.com/0/new-post/add-doubt",
        { postDetails, token: localStorage.getItem("cch-user-token") }
      );
      if (response.data.abusive_content) {
        NotificationManager.error(response.data.message, "Couldn't post");
      } else {
        if (!response.data.verification) {
          localStorage.removeItem("cch-user-token");
          localStorage.removeItem("cch-user-username");
          navigate("/login");
        } else {
          if (response.data.success) {
            NotificationManager.success(response.data.message);
            navigate("/home");
          } else {
            NotificationManager.error(response.data.message);
          }
        }
      }
    } catch (error) {
      console.log("Error in posting doubt", error);
    }
  };

  useEffect(() => {
    async function verifyToken(tokenObj) {
      try {
        const response = await axios.post(
          "https://competitive-coding-hub.herokuapp.com/0/new-post/verify",
          tokenObj
        );
        if (!response.data.success) {
          localStorage.removeItem("cch-user-token");
          localStorage.removeItem("cch-user-username");
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

  return (
    <div className="new-post-container">
      <h1 className="new-post-title">
        <span className="new-post-custom-letter">N</span>ew Post
      </h1>
      <div className="new-post-form">
        <form onSubmit={handleSubmit}>
          <input
            className="new-post-inp"
            type="text"
            name="title"
            maxLength={200}
            value={post.title}
            onChange={handleInputChange}
            placeholder="Title"
            required
          />
          <input
            className="new-post-inp"
            type="text"
            name="problem_link"
            pattern="https?://.+"
            title="Include http://"
            value={post.problem_link}
            onChange={handleInputChange}
            placeholder="Problem Link"
          />
          <div className="new-post-inps">
            <textarea
              rows={"8"}
              className="new-post-desc-inp"
              wrap="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              name="problem_desc"
              value={post.problem_desc}
              onChange={handleInputChange}
              placeholder="Your doubt.."
              required
            />
            <textarea
              rows={"8"}
              className="new-post-code-inp"
              wrap="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              name="code"
              value={post.code}
              onChange={handleInputChange}
              placeholder="Code snippet.."
            />
          </div>
          <div className="post-anonymous">
            <p className="pa-text">Post Anonymously ??</p>
            <div className="container">
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  className="checkbox"
                  name="isAnonymous"
                  id="anonymous"
                  checked={isAnonymous}
                  value="true"
                  onChange={handleAnonymousChange}
                />
                <label className="label" htmlFor={"anonymous"}>
                  <span className="inner" />
                  <span className="switch" />
                </label>
              </div>
            </div>
          </div>
          <button className="new-post-button" type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPost;
