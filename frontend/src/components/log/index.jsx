import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../helpers/features/userSlice";
import "./style.css";

const Log = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const log = async (e) => {
    e.preventDefault();
    // Vérifier si les champs email et mot de passe sont vides
    if (email.trim() === "" || password.trim() === "") {
      setError("Email address and password cannot be null or empty");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const item = { email, password };

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error("Invalid email address or password");
      }

      const result = await response.json();
      localStorage.setItem("token", result.token);

      const id = result.userId;
      const getinfos = await fetch(`http://localhost:3000/api/auth/${id}`);
      const resultGetInfos = await getinfos.json();

      dispatch(login({
        user: resultGetInfos,
      }));

      navigate("/");
    } catch (error) {
      setError(error.message);
      setEmail("");
      setPassword("");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <form className="form">
      <div className="input-wrapper">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-wrapper">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          id="password"
          required
        />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      {error && (
        <p className="error_login">{error}</p>
      )}
      <button type="submit" className="sign-in-button" onClick={log}>
        Log in
      </button>
    </form>
  );
};

export default Log;
