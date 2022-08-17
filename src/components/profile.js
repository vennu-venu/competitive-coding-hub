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
        <span className="profile-username">{userName}</span>
        <hr className="profile-line"/>
        <span>Doubts Posted</span>
        <span>{doubtsPosted}</span>
        <hr className="profile-line"/>
        <span>Doubts Answered</span>
        <span>{doubtsAnswered}</span>
    </div>
);
}

export default Profile;