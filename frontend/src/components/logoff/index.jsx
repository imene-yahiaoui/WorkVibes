import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../helpers/features/userSlice.js";
import { useNavigate, Link } from "react-router-dom";

import "./style.css";
const Logoff = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const infos = useSelector(login);
  let test = infos?.payload.user?.user?.user.email;
  // const user= useSelector(login)
  function Singout() {
    localStorage.removeItem("token");
    navigate("/Login");
    dispatch(logout());
  }

  return (
    <div className="logout">
      <Link className="nameUser" to="/profile">
        <i className="fa fa-user-circle"></i>
        <p className="user name">{test}</p>
      </Link>
      <button onClick={Singout} className="main-nav-item">
        <i className="fa fa-sign-out"></i>
        Sign out
      </button>
    </div>
  );
};

export default Logoff;
