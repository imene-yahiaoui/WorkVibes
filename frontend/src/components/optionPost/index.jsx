import React from "react";
import { Dropdown } from "react-bootstrap";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import "./style.css";

function OptionPost({ descriptionPost, sameUser }) {
  const deletePost = (e) => {
    e.preventDefault();
    alert("Delete Post");
  };

  const editPost = (e) => {
    e.preventDefault();
    alert("Edit Post");
  };

  return (
    <div className="postEdit">
      <p>{descriptionPost} </p>
      <div style={{ display: sameUser ? "block" : "none" }}>
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            <FiMoreHorizontal />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={editPost}>
              <BsFillTrash3Fill /> Edit
            </Dropdown.Item>
            <Dropdown.Item onClick={deletePost}>
              <BsPencilFill /> Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default OptionPost;
