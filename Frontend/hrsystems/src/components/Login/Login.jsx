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

        {/* About Section */}
        <div className="about">
          <h3>About Us</h3>
          <p>SecOpsDev provides software development solutions with top-tier security and operational efficiency. Our platform ensures seamless integration and robust security measures tailored to your needs.</p>
        </div>

        {/* Login Button */}
        <button className="login-button" onClick={handleLogin}>Login</button>

        {/* Interactive Walkthrough */}
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
