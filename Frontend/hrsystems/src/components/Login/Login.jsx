import React from "react";
import { useOktaAuth } from "@okta/okta-react";

const Login = () => {
  const { oktaAuth, authState } = useOktaAuth();

  const login = async () => {
    oktaAuth.signInWithRedirect();
  };

  if (authState?.isAuthenticated) {
    window.location.href = "/dashboard";
    return null;
  }

  return (
    <div style={styles.container}>
      <h1>HR System Login</h1>
      <button style={styles.button} onClick={login}>Login with Okta</button>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  button: { padding: "10px 20px", fontSize: "16px", cursor: "pointer" }
};

export default Login;
