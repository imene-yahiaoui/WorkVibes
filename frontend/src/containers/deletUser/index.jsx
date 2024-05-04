import "./style.css";
import { login } from "../../helpers/features/userSlice.js";
import { useSelector } from "react-redux";
import { logout } from "../../helpers/features/userSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function DeletUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const infos = useSelector(login);
  const id = infos?.payload.user?.user?.user._id |null;
  let token = localStorage.getItem("token");
  function delet() {
    setShow(true);
  }
  async function deleteUser(e) {
    e.preventDefault();

    const response = await fetch(`http://localhost:3000/api/auth/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      localStorage.removeItem("token");
      navigate("/Login");
      dispatch(logout());
    }
  }

  return (
    <div className="account_delete">
      <h6>Delete your account </h6>
      <button type="submit" className="sign-in-button editBtn" onClick={delet}>
        Delete
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this account? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteUser}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeletUser;
