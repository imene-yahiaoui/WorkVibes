import "./style.css";
import { login } from "../../helpers/features/userSlice.js";
import { useSelector } from "react-redux";
import { logout } from "../../helpers/features/userSlice.js";
import { useDispatch } from "react-redux";
function DeletUser() {
  const dispatch = useDispatch();

  const infos = useSelector(login);
  const id = infos?.payload.user?.user?.user._id;
  async function deleteUser(e) {
    e.preventDefault();

    let token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:3000/api/auth/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      dispatch(logout());
    }
  }

  return (
    <div className="account_delete">
      <h6>Delete your account </h6>
      <button type="submit" className="sign-in-button" onClick={deleteUser}>
        Delete
      </button>
    </div>
  );
}

export default DeletUser;
