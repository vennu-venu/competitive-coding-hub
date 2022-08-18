import "./App.css";
import Start from "./components/start";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import EmailVerification from "./components/emailVerification";
import ForgotPassword from "./components/forgotPassword";
import Profile from "./components/profile";
import { Routes, Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/verify-email" element={<EmailVerification/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
        <Route path="/profile/:username" element={<Profile/>}></Route>
      </Routes>
      <NotificationContainer />
    </div>
  );
}

export default App;
