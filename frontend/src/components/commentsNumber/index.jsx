import React from "react";
import { FaRegCommentDots } from "react-icons/fa";

function CommentsNumber({ number }) {
  return (
    <div className="">
      <FaRegCommentDots />
      <p>{number} comments</p>
    </div>
  );
}

export default CommentsNumber;
