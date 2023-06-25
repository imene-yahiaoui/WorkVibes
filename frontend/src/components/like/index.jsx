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
      //Si je souhaite afficher quelque chose lorsque le code est exécuté
    }
    if (fetchLike.status === 400) {
      // Si he souhaite  afficher quelque chose lorsque le code n'est  pas exécuté
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
      //Si je souhaite afficher quelque chose lorsque le code est exécuté
    }
    if (fetchLike.status === 400) {
      // Si he souhaite  afficher quelque chose lorsque le code n'est  pas exécuté
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
