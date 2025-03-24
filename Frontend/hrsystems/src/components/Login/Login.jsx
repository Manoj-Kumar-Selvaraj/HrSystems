import React from "react";
import { Helmet } from "react-helmet";
import oktaAuth from "../../oktaConfig"; // ✅ Import Okta config
import "./Login.css";

function Login() {
  const handleLogin = async () => {
    await oktaAuth.token.getWithRedirect({
      responseType: ["token", "id_token"], // ✅ Request access & ID token
    });
  };

  return (
    <div>
      <Helmet>
        <title>Login</title>
        <link rel="icon" href="/icon.png" />
      </Helmet>

      {/* ✅ Logo Section */}
      <div className="logo">
        <img src="/icon.png" alt="SecOpsDev" />
      </div>

      <div className="Login">
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
