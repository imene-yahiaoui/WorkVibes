import Log from "../../components/log";
import Signup from "../../components/signup";
import "./style.css";
import Company from "../../images/team.jpg";
import { useState } from "react";
function Login() {
  const [login, setLogin] = useState(true);
  const toggleLogin = () => {
    setLogin(!login);
  };
  return (
    <div className="Login">
      <figure className="Login_continer">
        <img src={Company} alt="company" />
        {login ? (

           
          <figcaption className="Login_auth">
                 <h2> Log in </h2>
            <Log />
            <div>
              <p>No account yet? </p>
              <button onClick={toggleLogin}>Signup</button>
            </div>
          </figcaption>
        ) : (
         
          <figcaption className="Login_auth">
                 <h2> Signup </h2>
            <Signup />
            <div>
              <p>No account yet? </p>
              <button onClick={toggleLogin}>Log in</button>
            </div>
          </figcaption>
        )}
      </figure>
    </div>
  );
}

export default Login;
