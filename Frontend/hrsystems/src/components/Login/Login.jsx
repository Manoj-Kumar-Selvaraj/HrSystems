import React, { useState } from "react";
import { Helmet } from "react-helmet";
import oktaAuth from "../../oktaConfig"; // ✅ Import Okta config
// import icon from "./login.jpg";
import "./Login.css";

function Login({ onLoginSuccess }) {
  const [eid, setEid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null);
    try {
      // ✅ Authenticate using Okta API
      const transaction = await oktaAuth.signInWithCredentials({
        username: eid,
        password: password,
      });

      if (transaction.status === "SUCCESS") {
        // ✅ Redirect-based authentication
        await oktaAuth.token.getWithRedirect({ sessionToken: transaction.sessionToken });

        // ✅ Call parent function if provided
        if (onLoginSuccess) {
          onLoginSuccess(transaction);
        }
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

      {/* ✅ Logo Section */}
      <div className="logo">
        <img src="icon.png" alt="SecOpsDev" />
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
