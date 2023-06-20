import "./style.css";
import React, { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

 
function Like({userId , id }) {
  const [countlike, setCountlike] = useState();
 
 
  const token = localStorage.getItem("token");
 
console.log("le userid est ",userId)
  const handleLike = async (e) => {
    e.preventDefault();
    const fetchLike = await fetch(` http://localhost:3000/api/like/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({ userId: userId }),
    });

    if (fetchLike.status === 200) {

        const requete = await fetch(`http://localhost:3000/api/post/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (requete.ok) {
            // const response = await requete.json();
            // setCountlike(response.like.length()); // Met à jour les posts
            alert("le like marche bien ")
          }

    }
  };
//   const handleDislike = async (e) => {
//     e.preventDefault();
//   };

  return (
    <div className="likeContiner">
      <button className="like" onClick={handleLike}>
        <AiFillLike color="green" />
        <p> {countlike} </p>
      </button>
      <button className="like" 
      
    //   onClick={handleDislike}
      
      
      >
        <AiFillDislike color="red" />
        {/* <p> {countDislike} </p> */}
      </button>
    </div>
  );
}

export default Like;
