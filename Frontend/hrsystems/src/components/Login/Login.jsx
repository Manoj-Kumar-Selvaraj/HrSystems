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
    <div className="login-container">
      <Helmet>
        <title>Login</title>
        <link rel="icon" href="/icon.png" />
      </Helmet>

      <div className="login-card">
        {/* Logo */}
        <div className="logo">
          <img src="/icon.png" alt="SecOpsDev" />
        </div>

        {/* Welcome Message */}
        <h2>Welcome to SecOpsDev</h2>
        <p className="description">Explore our secure solutions with a guided walkthrough.</p>

        {/* About Section */}
        <div className="about">
          <h3>About Us</h3>
          <p>SecOpsDev provides top-tier security and operational development solutions. Our platform ensures seamless integration and robust security measures tailored to your needs.</p>
        </div>

        {/* Try Demo Button */}
        <button className="demo-button" onClick={() => alert("Launching demo...")}>Try Demo</button>

        {/* Interactive Walkthrough (Placeholder) */}
        <div className="walkthrough">
          <h3>How It Works</h3>
          <p>Discover key features through our interactive guide.</p>
          <button className="walkthrough-button">Start Walkthrough</button>
        </div>
      </div>
    </div>
  );
}

export default Login;