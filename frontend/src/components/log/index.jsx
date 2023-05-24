import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./style.css";

const Log = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorUser, setErrorUser] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function log(e) {
    e.preventDefault();
    //empty
    if (email.length === 0 || password.length === 0) {
      setError(true);
      function msgdelet() {
        setError(false);
      }
      setTimeout(msgdelet, 30000);
    }
    let item = { email, password };

    let response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    console.log(response);
    let result = await response.json();
    console.log(result);
    if (response.status === 200) {
      console.log("token", result.token);
      localStorage.setItem("token", result.token);

      navigate("/");
    } else {
      setErrorUser(true);
      setEmail("");
      setPassword("");
      function deletError() {
        setErrorUser(false);
      }
      setTimeout(deletError, 3000);
    }
  }

  return (
    <form className="form">
      <div className="input-wrapper">
        <input
          // id="username"
          type="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          required
        />
      </div>
      <div className="input-wrapper">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
          id="password"
        />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      {error ? (
        <p className="error_login">
          Error: Email address and password cannot be null or empty
        </p>
      ) : (
        ""
      )}
      {!error && errorUser ? (
        <p className="error_login">Error: Invalid email address or password</p>
      ) : (
        ""
      )}
      <button type="submit" className="sign-in-button" onClick={log}>
        Log in
      </button>
    </form>
  );
};

export default Log;
