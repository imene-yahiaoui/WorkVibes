import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./style.css";
import DisplayMessage from "../displayMessage";
function OptionPost({ descriptionPost, sameUser, idPost }) {
  const [description, setDescription] = useState(descriptionPost);
  const [editMode, setEditMode] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const token = localStorage.getItem("token");

  const deletePost = async () => {
    const request = await fetch(`http://localhost:3000/api/post/${idPost}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.ok) {
      DisplayMessage(
        "Post deleted successfully",
        "linear-gradient(to right, #dfacec, #b65dcc)"
      );
    } else {
      DisplayMessage(
        "Deletion failed, please try again later",
        "linear-gradient(to right, #ee8f8f, #ad0606)"
      );
    }
  };
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const saveDescription = async () => {
    if (description.length === 0) {
      DisplayMessage(
        "Please provide a description",
        "linear-gradient(to right, #f7a8c5, #fdcedf)"
      );
      return;
    }

    const formData = new FormData();
    formData.append("description", description);

    const result = await fetch(`http://localhost:3000/api/post/${idPost}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (result.ok) {
      setEditMode(false);
    } else {
      DisplayMessage(
        "Failed to save description, please try again later",
        "linear-gradient(to right, #ee8f8f, #ad0606)"
      );
    }
  };

  return (
    <div className="postEdit">
      {sameUser && editMode ? (
        <form className="postSave" onSubmit={saveDescription}>
          <input
            type="text"
            className="post_inputText"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Save</button>
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
            <Dropdown.Item onClick={() => setShow(true)}>
              <BsFillTrash3Fill /> Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={deletePost}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default OptionPost;
