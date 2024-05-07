import React from "react";
import "./style.css";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useState } from "react";
import DisplayMessage from "../displayMessage";
function Like({ userId, id, countlike, countDislike, likeUser, dislikeUser }) {
  const [likList, setLikList] = useState(false);
  const [dislikList, setDislikList] = useState(false);
  const [usersLikes, setUsersLikes] = useState([]);
  const [usersDisLikes, setUsersDislikes] = useState([]);

  const token = localStorage.getItem("token");

  const handleAction = async (actionType) => {
    const endpoint = actionType === "like" ? "like" : "dislike";
    const fetchAction = await fetch(
      `http://localhost:3000/api/${endpoint}/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );

    if (fetchAction.ok) {
      DisplayMessage(
        "Post liked successfully ",
        "linear-gradient(to right, #dfacec, #b65dcc)"
      );
    } else {
      DisplayMessage(
        "You have already liked this post",
        "linear-gradient(to right, #dfacec, #b65dcc)"
      );
    }
  };
  const likeUserList = async () => {
    setLikList(!likList);

    const fetchAllUsers = await fetch(`http://localhost:3000/api/auth/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (fetchAllUsers.ok) {
      const data = await fetchAllUsers.json();
      const matchedUsers = [];
      for (let i = 0; i < likeUser.length; i++) {
        data.forEach((user) => {
          if (user._id === likeUser[i]) {
            matchedUsers.push(user);
          }
        });
      }
      setUsersLikes(matchedUsers);
    }
  };

  const dislikeUserList = async () => {
    setDislikList(!dislikList);
    const fetchAllUsers = await fetch(`http://localhost:3000/api/auth/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (fetchAllUsers.ok) {
      const data = await fetchAllUsers.json();
      const matchedUsers = [];
      for (let i = 0; i < dislikeUser.length; i++) {
        data.forEach((user) => {
          if (user._id === dislikeUser[i]) {
            matchedUsers.push(user);
          }
        });
      }
      setUsersDislikes(matchedUsers);
    }
  };
  const cover = "../../images/user.png";
  return (
    <div className="liks-with-list">
      <section className="likeContiner">
        <button className="like" onClick={() => handleAction("like")}>
          <AiFillLike color="green" />
        </button>
        <button className="like" onClick={likeUserList}>
          <p> {countlike} </p>
        </button>
        <button className="like" onClick={() => handleAction("dislike")}>
          <AiFillDislike color="red" />
        </button>
        <button className="like" onClick={dislikeUserList}>
          <p> {countDislike} </p>
        </button>
      </section>

      <section
        className="listUser"
        style={{
          display: usersLikes.length !== 0 && likList ? "flex" : "none",
        }}
      >
        {usersLikes.map((user) => {
          return (
            <li key={user._id}>
              {user.imageUrl ? (
                <img className="photoUser" alt="profile" src={user.imageUrl} />
              ) : (
                <img className="photoUser" src={cover} alt="user" />
              )}
              <p>{user.firstname}</p>
            </li>
          );
        })}
      </section>
      <section
        className="listUser"
        style={{
          display: usersDisLikes.length !== 0 && dislikList ? "flex" : "none",
        }}
      >
        {usersDisLikes.map((user) => {
          return (
            <li key={user._id}>
              {user.imageUrl ? (
                <img className="photoUser" alt="profile" src={user.imageUrl} />
              ) : (
                <img className="photoUser" src={cover} alt="user" />
              )}
              <p>{user.firstname}</p>
            </li>
          );
        })}
      </section>
    </div>
  );
}

export default Like;
