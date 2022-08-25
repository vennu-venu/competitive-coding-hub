import "../styles/home.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";
import { GoSearch } from "react-icons/go";
import Post from "./post";
import axios from "axios";

function MyPosts() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    async function verifyAndRetrieve(dataObj) {
      try {
        const response = await axios.post(
          "https://competitive-coding-hub.herokuapp.com/my-posts/verify-and-retrieve",
          dataObj
        );
        if (!response.data.verification) {
          localStorage.removeItem("cch-user-token");
          navigate("/login");
        } else {
          if (response.data.success) {
            setData(response.data);
            setFilterData(response.data.posts);
          } else {
            NotificationManager.error("Couldn't fetch the data");
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
        username: localStorage.getItem("cch-user-username")
      };
      verifyAndRetrieve(dataObj);
    }
  }, [navigate]);

  const handleSearchItem = (e) => {
    const searchItem = e.target.value;
    let res = data.posts.filter((post) => {
      return (
        post.title.toLowerCase().search(searchItem.toLowerCase()) !== -1
      );
    });
    if (e.target.value.length) {
      setFilterData(res);
    } else {
      setFilterData(data.posts);
    }
  };

  return (
    <>
      {data && (
        <>
          <div className="home-top-row">
            <div className="home-left">
              <div className="home-circle">
                <p className="home-count-val">{data.posts.length}</p>
              </div>
              <p className="home-post">Posts</p>
            </div>
            <div className="home-right">
              <p className="home-greet"><span className="profile-custom-letter">M</span>y Posts</p>
              <div>
                <GoSearch className="home-search-icon" />
                <input
                  className="home-search-inp"
                  type="text"
                  name="search"
                  onChange={handleSearchItem}
                  placeholder="Search by Title"
                  required
                />
              </div>
            </div>
          </div>
          <div className="home-cards-container">
            {filterData.length > 0 ? (
              <div className="home-cards">
                {filterData.map((post) => {
                  return <Post key={post._id} post={post} isMyPost={true}/>;
                })}
              </div>
            ) : (
              <div>
                <p className="home-no-data">No data found</p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default MyPosts;
