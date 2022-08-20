import React from "react";
import { Link } from "react-router-dom";
import { FaReplyAll, FaRegCalendar, FaUser } from "react-icons/fa";
import "../styles/post.css";

function Post(props) {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function getDate(timestamp) {
    let date = new Date(parseInt(timestamp));
    let time =
      date.getDate() +
      " " +
      month[date.getMonth()] +
      ", " +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();
    return time;
  }

  return (
    <>
      <div className="post-card">
        <Link className="post-title" to={"/posts/" + props.post._id}>
          <p>
            {props.post.title.length > 50
              ? props.post.title.substring(0, 50) + "..."
              : props.post.title}
          </p>
        </Link>
        <p className="post-desc">
          {props.post.problem_desc.length > 250
            ? props.post.problem_desc.substring(0, 200) + "..."
            : props.post.problem_desc}
        </p>
        <div className="post-bottom">
          <div>
            <p className="post-reply">
              <FaReplyAll className="post-icon" />
              {props.post.replies.length > 1
                ? props.post.replies.length + " Replies "
                : props.post.replies.length + " Reply "}
            </p>
          </div>
          <div className="post-details">
            <p>
              <FaRegCalendar className="post-icon" />
              {getDate(props.post.time)}
            </p>
            {!props.isMyPost && (
              <Link
                className="post-user-link"
                to={"/profile/" + props.post.user}
              >
                <FaUser className="post-icon" />
                {props.post.user}
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
