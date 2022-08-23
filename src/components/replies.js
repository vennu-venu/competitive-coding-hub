import "../styles/replies.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaReplyAll, FaRegCalendar, FaUser } from "react-icons/fa";
import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";
import { TbSend } from "react-icons/tb";
import axios from "axios";
import Reply from "./reply";

function Replies() {
  const { post_id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [replyDesc, setReplyDesc] = useState("");
  const [replyCode, setReplyCode] = useState("");

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

  function handleDescChange(e) {
    setReplyDesc(e.target.value);
  }
  function handleCodeChange(e) {
    setReplyCode(e.target.value);
  }
  function goToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }
  async function postReply() {
    if (replyDesc.length === 0) {
      NotificationManager.error("Reply should not be empty !!");
      return;
    }
    const replyData = {
      reply: replyDesc,
      reply_code: replyCode,
      time: Date.now(),
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/posts/post-reply",
        {
          token: localStorage.getItem("cch-user-token"),
          post_id: post_id,
          replyData: replyData,
        }
      );
      if (!response.data.verification) {
        NotificationManager.error(response.data.message);
        localStorage.removeItem("cch-user-token");
        localStorage.removeItem("cch-user-username");
        navigate("/login");
      } else {
        if (response.data.success) {
          NotificationManager.success("Your reply has been posted");
          window.location.reload();
        } else {
          NotificationManager.error(response.data.message);
          navigate("/home");
        }
      }
    } catch (error) {
      console.log("Error in sending message", error);
    }
  }

  useEffect(() => {
    async function verifyAndRetrieve(dataObj) {
      try {
        const response = await axios.post(
          "http://localhost:5000/posts/verify-and-retrieve",
          dataObj
        );
        if (!response.data.verification) {
          localStorage.removeItem("cch-user-token");
          localStorage.removeItem("cch-user-username");
          navigate("/login");
        } else {
          if (response.data.success) {
            setPost(response.data.post);
          } else {
            NotificationManager.error(response.data.message);
            navigate("/home");
          }
        }
      } catch (error) {
        console.log("Error in Token Vefification: ", error);
      }
    }

    if (localStorage.getItem("cch-user-token") === null) {
      navigate("/login");
    } else {
      const dataObj = {
        token: localStorage.getItem("cch-user-token"),
        post_id: post_id,
      };
      verifyAndRetrieve(dataObj);
    }
  }, [navigate, post_id]);

  return (
    <>
      {post ? (
        <div className="reply-post-container">
          <h1 className="reply-post-title">{post.title}</h1>
          <div className="reply-post-det">
            <p>
              <FaRegCalendar className="reply-post-icon" />
              {getDate(post.time)}
            </p>

            <Link className="reply-post-user-link" to={"/profile/" + post.user}>
              <FaUser className="reply-post-icon" />
              {post.user}
            </Link>
          </div>
          <button className="go-to-send" onClick={goToBottom}>
            <FaReplyAll className="reply-send-icon" /> Reply
          </button>
          {post.problem_link && (
            <a
              className="go-to-problem"
              href={post.problem_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to problem
            </a>
          )}
          <div className="reply-post-desc">{post.problem_desc}</div>
          <div className="reply-post-code">{post.code}</div>
          {post.replies && (
            <div className="reply-count">
              <p className="reply-count-val">{post.replies.length}</p>
              <p>{post.replies.length > 1 ? "Replies" : "Reply"}</p>
            </div>
          )}
          {post.replies && (
            <>
              {post.replies.map((reply, index) => {
                return <Reply key={index} reply={reply} />;
              })}
            </>
          )}
          <p className="your-reply">Your Reply</p>
          <div>
            <textarea
              rows={"5"}
              className="reply-desc-inp"
              wrap="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              value={replyDesc}
              onChange={handleDescChange}
              placeholder="Your reply.."
            />
          </div>
          <div>
            <textarea
              rows={"5"}
              className="reply-code-inp"
              wrap="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              value={replyCode}
              onChange={handleCodeChange}
              placeholder="Code snippet.."
            />
          </div>
          <button className="reply-send" onClick={postReply}>
            Send <TbSend className="reply-send-icon" />
          </button>
        </div>
      ) : (
        <div>
          <h1>No Data</h1>
        </div>
      )}
    </>
  );
}

export default Replies;
