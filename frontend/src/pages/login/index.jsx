import Log from "../../components/log";
import Signup from "../../components/signup";
import "./style.css";
// import Company from "../../images/team.jpg";
import { useState } from "react";
import { HiOutlineGlobeAlt } from "react-icons/hi";
function Login() {
  const [login, setLogin] = useState(true);
  const toggleLogin = () => {
    setLogin(!login);
  };
  return (
    <div className="Login">
      <figure className="Login_continer">
        {/* <img src={Company} alt="company" /> */}
        {login ? (
          <figcaption className="Login_auth">
            <div className="loginTitle">
              <HiOutlineGlobeAlt className=" App-logo logo" />
              <h2> Log in </h2>
            </div>
            <Log />
            <div className="login_signup">
              <p>No account yet? </p>
              <button onClick={toggleLogin}>Signup</button>
            </div>
          </figcaption>
        ) : (
          <figcaption className="Login_auth">
            <div className="loginTitle">
              <HiOutlineGlobeAlt className=" App-logo logo" />
              <h2> Sign up </h2>
            </div>

            <Signup />
            <div className="login_signup">
              <p>Already have an account? </p>
              <button onClick={toggleLogin}>Log in</button>
            </div>
          </figcaption>
        )}
      </figure>
    </div>
  );
}

export default Login;
