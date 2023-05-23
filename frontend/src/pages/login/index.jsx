import Log from "../../components/log";
//  import Signup from "../../components/signup";
import "./style.css";
import Company from "../../images/team.jpg";

function Login() {
  return (
    <div className="Login">
      <figure className="Login_continer">
        <img src={Company} alt="company" />

        <figcaption>
          <Log />;
        </figcaption>
      </figure>
    </div>
  );
}

export default Login;
