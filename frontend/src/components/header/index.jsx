import "./style.css";
import { Link } from "react-router-dom";
import Logoff from "../../components/logoff";
function Header() {
  console.log("herder il est la ");

  return (
    <div className="header">
      <ul className="nav_icon">
        <li className="icon">
          <i className="fa-sharp fa-solid fa-globe"></i>
          <h1> Groupmania </h1>
        </li>
      </ul>
      <ul className="nav-elements">
        <li>
          <Link to="/">
            <i className="fa-solid fa-house-chimney"></i>
          </Link>
        </li>
        <li>
          <Link to="/">
            <i className="fa-sharp fa-solid fa-user-group"></i>
          </Link>
        </li>
        <li>
          <Link to="/" >
            <i className="fa-solid fa-user"></i>
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
