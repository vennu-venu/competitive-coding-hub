import "../styles/post.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaCalendarDay } from 'react-icons/fa';
import axios from "axios";
import { Link} from "react-router-dom";

function Post({ id, title, postedBy, date,question, replies }) {

  const truncate = (input) =>
      input.length > 100 ? `${input.substring(0, 90)}...` : input;

  return (
    <div>
<Link className="post-Link" to={`/posts/${id}`}>
    <div class="post-card">
      <h3>{title}</h3>
      <p>{truncate(question)}</p>
      <span className="post-replies">Replies : {replies}</span>
      <span className="post-by"><b>{postedBy}</b></span><span className="post-date"><FaCalendarDay/> {date}</span>
    </div>
    </Link>
    </div>
  );
}

export default Post;
