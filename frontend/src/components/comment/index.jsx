import React, { useState } from "react";
import { useSelector } from "react-redux";
import { LuSend } from "react-icons/lu";
import { login } from "../../helpers/features/userSlice.js";

import "./style.css";

function Comment({ idComment }) {
  const [comment, setComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const infos = useSelector(login);
  const imageUser = infos?.payload.user?.user?.user.imageUrl;

  const token = localStorage.getItem("token");

  const sendComment = async (e) => {
    e.preventDefault();

    if (comment.trim() === "") {
      alert("Please enter a comment");
      return;
    }

    const commentPost = await fetch(
      `http://localhost:3000/api/comment/${idComment}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({ comment: comment }),
      }
    );

    if (commentPost.status === 201) {
      setComment("");
    }
  };

  const cover = "../images/user.png";

  return (
    <form method="post" className="comment" encType="multipart/form-data">
      <figure className="comment_continer ">
        {imageUser ? (
          <img className="photoUser" alt="profile" src={imageUser} />
        ) : (
          <img className="photoUser" src={cover} alt="user" />
        )}

        <figcaption>
          <input
            type="text"
            className="post_inputText"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </figcaption>
      </figure>

      <button className="sendComment" onClick={sendComment}>
        <LuSend />
      </button>
    </form>
  );
}

export default Comment;
