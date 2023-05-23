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
      // if (result.userId === "64242194688802ba1e6ee5fd") {
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
    <form>
      <div className="input-wrapper">
        <label htmlFor="username">Adresse e-mail</label>
        <input
          id="username"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Mot de passe</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
        />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Se souvenir de moi</label>
      </div>
      {error ? (
        <p className="error">
          Erreur : l'adresse e-mail et le mot de passe ne peuvent pas être nuls
          ou vides
        </p>
      ) : (
        ""
      )}
      {!error && errorUser ? (
        <p className="error">Erreur dans l'adresse e-mail ou le mot de passe</p>
      ) : (
        ""
      )}
      <button type="submit" className="sign-in-button" onClick={log}>
        connexion
      </button>
    </form>
  );
};

export default Log;
