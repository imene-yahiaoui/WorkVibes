import "./style.css";
import { Link } from "react-router-dom";
import Logoff from "../../components/logoff";
import { HiUsers } from "react-icons/hi";
import { HiOutlineHome } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
function Header() {
  console.log("herder il est la ");

  return (
    <div className="header">
      <ul className="nav_icon">
        <li className="icon">
          <HiOutlineGlobeAlt className=" App-logo" />
          <h1> WorkVibes </h1>
        </li>
      </ul>
      <ul className="nav-elements">
        <li>
          <Link to="/">
            <HiOutlineHome />
          </Link>
        </li>
        <li>
          <Link to="/UserList">
            <HiUsers />
          </Link>
        </li>
        <li>
          <Link to="/Account">
            <HiOutlineUser />
          </Link>
        </li>
        <li>
          <Logoff />
        </li>
      </ul>
    </div>
  );
}

export default Header;
