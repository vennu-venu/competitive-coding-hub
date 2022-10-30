import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import "../styles/volunteers.css";

function Volunteers() {
  const navigate = useNavigate();

  const [mount, setMount] = useState(false);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");

  const handleInput = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email) => {
    if(email.split('@').length === 2) {
      if(email.split('@')[1].split('.').length === 2) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validateEmail(email)) {
      try {
        const response = await axios.post(
          "https://competitive-coding-hub.herokuapp.com/admin/add-volunteer",{ email },
          {
            headers: { authorization: localStorage.getItem("cch-user-token") },
          }
        );
        if (response.data.success) {
          NotificationManager.success("Volunteer was added successfuly", "", 4000);
          getData(localStorage.getItem("cch-user-token"));
        }
        else {
          NotificationManager.error(response.data.message, "Volunteer was not added", 4000);
        }
      } catch (error) {
        console.log("Error in adding Volunteer", error);
      }
    }
    else {
      NotificationManager.error(
        "Invalid Email", "", 4000
      );
    }
  };

  async function getData(token) {
    try {
      const response = await axios.get(
        "https://competitive-coding-hub.herokuapp.com/admin/get-volunteers",
        {
          headers: { authorization: token },
        }
      );
      if (response.data.success) {
        setData(response.data.volunteers);
      }
    } catch (error) {
      console.log("Error in fetching Volunteers Data", error);
    }
  }

  useEffect(() => {
    async function verifyToken(token) {
      try {
        const response = await axios.get("https://competitive-coding-hub.herokuapp.com/admin/verify", {
          headers: { authorization: token },
        });
        if (response.data.success) {
          if (response.data.role !== "admin") {
            navigate("/admin-login");
          } else {
            setMount(true);
            getData(token);
          }
        } else {
          localStorage.removeItem("cch-user-token");
          navigate("/admin-login");
        }
      } catch (error) {
        console.log("Error in Token Vefification: ", error);
        navigate("/admin-login");
      }
    }
    if (localStorage.getItem("cch-user-token") !== null) {
      const token = localStorage.getItem("cch-user-token");
      verifyToken(token);
    } else {
      navigate("/admin-login");
    }
  }, [navigate]);

  const removeVolunteer = async (id) => {
    try {
      const url = "https://competitive-coding-hub.herokuapp.com/admin/remove-volunteer/" + id;
      const response = await axios.delete(
        url,
        {
          headers: { authorization: localStorage.getItem("cch-user-token") },
        }
      );
      if (response.data.success) {
        NotificationManager.success("Volunteer was removed successfuly", "", 4000);
        let updatedData = data.filter(volunteer => volunteer._id !== id);
        setData(updatedData);
      }
      else {
        NotificationManager.error("Couldn't remove the Volunteer", "", 4000);
      }
    } catch (error) {
      console.log("Error in fetching Volunteers Data", error);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <>
      {mount && (
        <>
          <div className="volunteer-container">
            <h1 className="volunteer-title">
              <span className="volunteer-letter">V</span>olunteers
            </h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <input
                className="volunteer-inp"
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleInput}
                required
              />
              <button className="volunteer-button" type="submit">
                Add Volunteer
              </button>
              <button className="volunteer-button" onClick={() => {logout()}}>
                Logout
              </button>
            </form>
            <div className="volunteers">
              {data.map((volunteer) => {
                return (
                  <div key={volunteer._id} className="volunteer-card">
                    <p className="volunteer-email">{volunteer.email}</p>
                    <button
                      className="volunteer-remove-button"
                      onClick={() => {
                        removeVolunteer(volunteer._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Volunteers;
