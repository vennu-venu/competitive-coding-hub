import "../styles/post.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


function Post({id, title, postedBy,date,replies}) {
    return (
      // <div>
      //   <div>{id}</div>
      //   <div>{title}</div>
      //   <div>{postedBy}</div>
      //   <div>{date}</div>
      //   <div>{replies}</div>
      // </div>

<div class="card">
    <div class="container">
      <h1>{title}</h1>
    </div>

    <div class="container">
      Question
       </div>

    <div class="container ">
      <h5>{replies}</h5>
      <h5>{date}</h5>
      <h5>{postedBy}</h5>
    </div>
  </div>

    );
  }

  export default Post;