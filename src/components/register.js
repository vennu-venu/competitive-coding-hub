import React, { useState } from "react";
import "../styles/register.css";

function Start() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let name, value;

  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <div className="body-componant">
      <form onSubmit={handleSubmit}>
        <p className="title">Register</p>
        <input
          type="text"
          name="first_name"
          pattern="[A-Za-z]{3,}"
          title="Three or more characters"
          value={user.first_name}
          onChange={handleInput}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="last_name"
          pattern="[A-Za-z]{3,}"
          title="Three or more characters"
          value={user.last_name}
          onChange={handleInput}
          placeholder="Last Name"
          required
        />
        <br />
        <input
          className="fullwidth"
          type="text"
          name="username"
          pattern=".{8,}"
          title="Eight or more characters"
          value={user.username}
          onChange={handleInput}
          placeholder="User Name"
          required
        />
        <br />
        <input
          className="fullwidth"
          type="email"
          name="email"
          value={user.email}
          onChange={handleInput}
          placeholder="Email"
          required
        />
        <br />
        <input
          className="fullwidth"
          type="password"
          name="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
          value={user.password}
          onChange={handleInput}
          placeholder="Password"
          required
        />
        <br />
        <input
          className="fullwidth"
          type="password"
          name="cpassword"
          pattern={user.password}
          title="passwords don't match"
          value={user.cpassword}
          onChange={handleInput}
          placeholder="Confirm Password"
          required
        />
        <br />
        <button type="submit">Register Now</button>
      </form>
    </div>
  );
}

export default Start;
