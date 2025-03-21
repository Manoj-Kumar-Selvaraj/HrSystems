import React, { useState } from "react";
import { Helmet } from "react-helmet";
import OktaAuth from "@okta/okta-auth-js";
import icon from "./icon.png";
import "./Login.css";

const oktaAuth = new OktaAuth({
  issuer: "https://okta.manoj-techworks.site/oauth2/default",
  clientId: "0oanwc9h6wnB5YrOo5d7",
  redirectUri: "https://okta.manoj-techworks.site/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
});

function Login() {
  const [eid, setEid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null);
    try {
      const transaction = await oktaAuth.signInWithCredentials({
        username: eid,
        password: password,
      });

      if (transaction.status === "SUCCESS") {
        oktaAuth.signInWithRedirect();
      } else {
        setError("Login failed. Invalid credentials.");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <Helmet>
        <title>Login</title>
        <link rel="icon" href={icon} />
      </Helmet>

      <div className="login-card">
        <div className="logo">
          <img src={icon} alt="Company Logo" />
        </div>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          value={eid}
          onChange={(e) => setEid(e.target.value)}
          placeholder="Employee ID"
          className="input-field"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input-field"
        />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
