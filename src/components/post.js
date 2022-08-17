import "../styles/post.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaCalendarDay } from 'react-icons/fa';
import axios from "axios";

function Post({ id, title, postedBy, date, replies }) {
  return (

    <div class="post-card">
      <h3>{title}</h3>
      <p>Question</p>
      <p>Replies : {replies}</p>
      <span className="post-by"><b>{postedBy}</b></span><span className="post-date"><FaCalendarDay/> {date}</span>
    </div>
  );
}

export default Post;
