import "../styles/post.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaCalendarDay } from 'react-icons/fa';
import axios from "axios";

function Post({ id, title, postedBy, date,question, replies }) {
  return (

    <div class="post-card">
      <h3>{title}</h3>
      <p>{question}</p>
      <span className="post-replies">Replies : {replies}</span>
      <span className="post-by"><b>{postedBy}</b></span><span className="post-date"><FaCalendarDay/> {date}</span>
    </div>
  );
}

export default Post;
