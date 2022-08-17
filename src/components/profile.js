import "../styles/profile.css";
import { useEffect, useState } from "react";
import {BsPersonSquare} from 'react-icons/bs'


function Profile() {
    const [userName, updateUserName] = useState("Username");
    const [doubtsPosted, updateDoubtsPosted] = useState(10);
    const [doubtsAnswered, updateDoubtsAnswered] = useState(3);
return(
    <div className="profile-main">
        <span className="profile-icon"><BsPersonSquare/></span>
        <span className="profile-username"><b> {userName}</b></span>
        <br/>
        <br/>
        <span><b>Doubts Posted</b></span>
        <span> {doubtsPosted}</span>
        <br/>
        <span><b>Doubts Answered</b></span>
        <span> {doubtsAnswered}</span>
    </div>
);
}

export default Profile;