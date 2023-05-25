import { useDispatch } from "react-redux";
import { logout } from "../../helpers/features/userSlice.js";
import { useNavigate } from "react-router-dom";

import "./style.css";
const Logoff = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function Singout() {
    localStorage.removeItem("token");
    navigate("/Login");
    dispatch(logout());
  }

  return (
    <div className="logout">
      <button onClick={Singout} className="main-nav-item">
        <i className="fa fa-sign-out"></i>
      </button>
    </div>
  );
};

export default Logoff;
