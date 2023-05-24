import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./style.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const navigate = useNavigate();

  async function log(e) {
    e.preventDefault();
    //empty
    if (
      email.length === 0 ||
      password.length === 0 ||
      firstname.length === 0 ||
      lastname.length === 0
    ) {
      setError(true);

      setErrorEmail(false);
      setErrorUser(false);
      setErrorPassword(false);
      function msgdelet() {
        setError(false);
      }
      setTimeout(msgdelet, 30000);
    }

    //if password length < = 5
    if (password.length < 6) {
      setErrorPassword(true);
      setError(false);
      setErrorEmail(false);
      setErrorUser(false);
      function msgdelet() {
        setErrorPassword(false);
      }
      setTimeout(msgdelet, 4000);
    }

    //if user name or last name < 3

    if (firstname.length < 3 || lastname.length < 3) {
      setErrorUser(true);
      setError(false);
      setErrorEmail(false);
      setErrorPassword(false);
      function msgdelet() {
        setErrorUser(false);
      }
      setTimeout(msgdelet, 4000);
    }

    let item = { email, password, firstname, lastname };

    let response = await fetch("http://localhost:3000/api/auth/signup", {
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
      //if email its used
    } else if (response.status === 400) {
      setError(false);
      setErrorEmail(true);
      setErrorUser(false);
      setErrorPassword(false);
      function deleteError() {
        setErrorEmail(false);
      }

      setTimeout(deleteError, 4000);
    }
  }
  return (
    <form className="form">
      <div className="input-names">
        <div className="input-name">
          <input
            id="Firstname"
            type="text"
            placeholder="First name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="input-name">
          <input
            id="Lastname"
            type="text"
            placeholder="Last name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
      </div>
      <div className="input-wrapper">
        <input
          id="username"
          type="email"
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
      {errorPassword ? (
        <p className="error_login">Password minimum 6 characters</p>
      ) : (
        ""
      )}
      {errorUser ? (
        <p className="error_login">
          First name and Last name minimum 3 characters
        </p>
      ) : (
        ""
      )}
      {error ? (
        <p className="error_login">Please fill in all the fields</p>
      ) : (
        ""
      )}
      {errorEmail ? (
        <p className="error_login">This address is already used</p>
      ) : (
        ""
      )}
      <button type="submit" className="sign-in-button" onClick={log}>
        Create your account
      </button>
    </form>
  );
};

export default Signup;
