import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./style.css";

function OptionPost({ descriptionPost, sameUser, idPost }) {
  const [description, setDescription] = useState(descriptionPost);
  const [editMode, setEditMode] = useState(false);
  const [show, setShow] = useState(false);
  //pour cancel la supression
  const handleClose = () => setShow(false);
  const token = localStorage.getItem("token");
  function delet() {
    setShow(true);
  }
  //pour supremier le post
  const deletePost = async (e) => {
    e.preventDefault();

    const request = await fetch(` http://localhost:3000/api/post/${idPost}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.status === 200) {
      alert("Post deleted successfully. ");
    }
  };
  //le mode edit
  const toggleEditMode = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  };

  //sauvgarder les modification de description
  const saveDescription = async (e) => {
    e.preventDefault();
    if (description.length === 0) {
      alert("Please enter a description.");
      return;
    }
    //fetche put pour la description
    const formData = new FormData();
    formData.append("description", description);

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
            <Dropdown.Item onClick={delet}>
              <BsFillTrash3Fill /> Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Modal show={show} onHide={deletePost}>
          <Modal.Header closeButton>
            <Modal.Title>Supprime</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this account?{" "}
          </Modal.Body>
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
