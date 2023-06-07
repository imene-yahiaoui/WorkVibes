import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import "./style.css";

function OptionPost({ descriptionPost, sameUser, idPost }) {
  const [description, setDescription] = useState(descriptionPost);
  const [editMode, setEditMode] = useState(false);

  const deletePost = (e) => {
    e.preventDefault();
    alert("Delete Post");
  };

  const toggleEditMode = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  };

  const saveDescription = async (e) => {
    e.preventDefault();
    //fetche put pour la description
    const formData = new FormData();
    formData.append("description", description);
    const token = localStorage.getItem("token");
    const result = await fetch(` http://localhost:3000/api/post/${idPost}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (result.status === 200) {
      setEditMode(false);
    }
  };

  return (
    //si le meme user et je clicke sur edit mode
    <div className="postEdit">
      {sameUser && editMode ? (
        <form onSubmit={saveDescription}>
          <input
            type="text"
            className="post_inputText"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={saveDescription} type="submit">
            Save
          </button>
        </form>
      ) : (
        <p>{descriptionPost}</p>
      )}

      <div style={{ display: sameUser ? "block" : "none" }}>
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            <FiMoreHorizontal />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={toggleEditMode}>
              <BsPencilFill /> Edit
            </Dropdown.Item>
            <Dropdown.Item onClick={deletePost}>
              <BsFillTrash3Fill /> Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default OptionPost;
