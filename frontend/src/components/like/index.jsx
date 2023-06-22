import "./style.css";

import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

function Like({ userId, id, countlike, countDislike }) {
  const token = localStorage.getItem("token");

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
      alert("le like marche bien ");
    }
    if (fetchLike.status === 400) {
      alert("vous aver deja liker ");
    }
  };
  const handleDislike = async (e) => {
    e.preventDefault();

    const fetchLike = await fetch(` http://localhost:3000/api/dislike/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({ userId: userId }),
    });

    if (fetchLike.status === 200) {
      alert("le dislike marche bien ");
    }
    if (fetchLike.status === 400) {
      alert("vous aver deja disliker ");
    }
  };

  return (
    <div className="likeContiner">
      <button className="like" onClick={handleLike}>
        <AiFillLike color="green" />
        <p> {countlike} </p>
      </button>
      <button className="like" onClick={handleDislike}>
        <AiFillDislike color="red" />
        <p> {countDislike} </p>
      </button>
    </div>
  );
}

export default Like;
