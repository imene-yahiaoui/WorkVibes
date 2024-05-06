import "./style.css";
import { login } from "../../helpers/features/userSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../helpers/features/userSlice.js";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function DeleteUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const userInfo = useSelector(login);
  const id = userInfo?.payload.user?.user?.user?._id;
  const token = localStorage.getItem("token");

  const handleClose = () => setShow(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/Login");
      } else {
        // Handle delete failure
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleShow = () => setShow(true);

  return (
    <div className="account_delete">
      <h6>Delete your account</h6>
      <button type="button" className="sign-in-button editBtn" onClick={handleShow}>
        Delete
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this account?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteUser;
