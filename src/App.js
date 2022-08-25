import "./App.css";
import Start from "./components/start";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import EmailVerification from "./components/emailVerification";
import ForgotPassword from "./components/forgotPassword";
import Profile from "./components/profile";
import UpdateProfile from "./components/updateProfile";
import NavBar from "./components/navbar";
import SignOut from "./components/signOut";
import MyPosts from "./components/myPosts";
import Replies from "./components/replies";
import NewPost from "./components/newPost";
import { HashRouter, Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    async function verifyToken(tokenObj) {
      try {
        const response = await axios.post(
          "https://competitive-coding-hub.herokuapp.com/profile/verify",
          tokenObj
        );
        if (response.data.success) {
          setUserEmail(response.data.email);
        } else {
          localStorage.removeItem("cch-user-token");
        }
      } catch (error) {
        console.log("Error in Token Vefification: ", error);
      }
    }
    if (localStorage.getItem("cch-user-token") !== null) {
      const tokenObj = {
        token: localStorage.getItem("cch-user-token"),
      };
      verifyToken(tokenObj);
    }
  }, [navigate]);

  return (
    <div>
      {userEmail && <NavBar email={userEmail}/>}
      <HashRouter>
        <Route path="/" element={<Start />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/verify-email" element={<EmailVerification/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
        <Route path="/profile/:username" element={<Profile/>}></Route>
        <Route path="/update-profile" element={<UpdateProfile/>}></Route>
        <Route path="/sign-out" element={<SignOut/>}></Route>
        <Route path="/my-posts" element={<MyPosts/>}></Route>
        <Route path="/posts/:post_id" element={<Replies/>}></Route>
        <Route path="/new-post" element={<NewPost/>}></Route>
      </HashRouter>
      <NotificationContainer />
    </div>
  );
}

export default App;
