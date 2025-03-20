import React, { useState } from "react";
import { Helmet } from "react-helmet";
import OktaAuth from "@okta/okta-auth-js";
import icon from "./login.jpg";
import "./Login.css";

// Okta Authentication Configuration
const oktaAuth = new OktaAuth({
  issuer: "https://okta.manoj-techworks.site/oauth2/default",
  clientId: "0oanwc9h6wnB5YrOo5d7",
  redirectUri: "https://okta.manoj-techworks.site/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
});

function Login({ onLoginSuccess }) {
  const [eid, setEid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null);
    try {
      // Authenticate using Okta API
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
    <div>
      <Helmet>
        <title>Login</title>
        <link rel="icon" href={icon} />
      </Helmet>

      {/* Logo Section */}
      <div className="logo">
        <img src="/logo.png" alt="Company Logo" />
      </div>

      <div className="Login">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          value={eid}
          onChange={(e) => setEid(e.target.value)}
          placeholder="Employee ID"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
