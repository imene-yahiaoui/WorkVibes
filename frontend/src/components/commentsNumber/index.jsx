import React from "react";
import { FaRegCommentDots } from "react-icons/fa";
import "./style.css";
function CommentsNumber({ number }) {
  return (
    <div className="comments">
      <FaRegCommentDots />
      <p>{number}</p>
    </div>
  );
}

export default CommentsNumber;
