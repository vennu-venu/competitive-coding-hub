import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignOut() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("cch-user-token");
    localStorage.removeItem("cch-user-username");
    navigate("/");
  }, [navigate]);

  return (
    <></>
  )
}

export default SignOut;