import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./style.css";
import DisplayMessage from "../displayMessage";
function OptionComment({ commentPost, sameUser, idcomment }) {
  const [comment, setComment] = useState(commentPost);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const token = localStorage.getItem("token");

  const handleClose = () => setShowDeleteModal(false);

  const deleteComment = async () => {
    const request = await fetch(
      `http://localhost:3000/api/comment/${idcomment}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (request.ok) {
      setShowDeleteModal(false);
    } else {
      DisplayMessage(
        "Deletion failed, please try again later",
        "linear-gradient(to right, #ee8f8f, #ad0606)"
      );
    }
  };

  const toggleEditMode = () => setEditMode(!editMode);

  const saveDescription = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      DisplayMessage(
        "Please provide a description",
        "linear-gradient(to right, #f7a8c5, #fdcedf)"
      );
      return;
    }

    try {
      const result = await fetch(
        `http://localhost:3000/api/comment/${idcomment}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment }),
        }
      );

      if (result.ok) {
        setEditMode(false);
      } else {
        throw new Error("Failed to update comment.");
      }
    } catch (error) {
      console.error("Error updating comment:", error.message);
    }
  };

  return (
    <div className="postEdit commentEdit">
      {sameUser && editMode ? (
        <form className="postSave" onSubmit={saveDescription}>
          <input
            type="text"
            className="post_inputText"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <p>{commentPost}</p>
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
            <Dropdown.Item onClick={() => setShowDeleteModal(true)}>
              <BsFillTrash3Fill /> Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Modal show={showDeleteModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={deleteComment}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default OptionComment;
