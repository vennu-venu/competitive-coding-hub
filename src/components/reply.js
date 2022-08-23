import React from "react";
import "../styles/reply.css";
import { FaRegCalendar, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Reply(props) {
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
    <div className="reply">
      <div className="reply-post-det">
        <Link
          className="reply-post-user-link"
          to={"/profile/" + props.reply.user}
        >
          <FaUser className="reply-post-icon" />
          {props.reply.user}
        </Link>
        <p>
          <FaRegCalendar className="reply-post-icon" />
          {getDate(props.reply.time)}
        </p>
      </div>
      {props.reply.reply && <div className="reply-post-desc">{props.reply.reply}</div>}
      {props.reply.reply_code && <div className="reply-code">{props.reply.reply_code}</div>}
    </div>
  );
}

export default Reply;
