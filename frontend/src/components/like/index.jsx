import React from "react";
import "./style.css";
import { AiFillLike, AiFillDislike } from "react-icons/ai";

function Like({ userId, id, countlike, countDislike }) {
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
      // Handle successful action
    } else {
      // Handle failed action
    }
  };

  return (
    <div className="likeContiner">
      <button className="like" onClick={() => handleAction("like")}>
        <AiFillLike color="green" />
        <p> {countlike} </p>
      </button>
      <button className="like" onClick={() => handleAction("dislike")}>
        <AiFillDislike color="red" />
        <p> {countDislike} </p>
      </button>
    </div>
  );
}

export default Like;
