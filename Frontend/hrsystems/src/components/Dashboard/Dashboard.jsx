import React from "react";
import { useOktaAuth } from "@okta/okta-react";

const Dashboard = () => {
  const { oktaAuth, authState } = useOktaAuth();

  const logout = async () => {
    oktaAuth.signOut();
  };

  if (!authState?.isAuthenticated) {
    return <div>Access Denied. Please <a href="/">Login</a>.</div>;
  }

  return (
    <div style={styles.container}>
      <h1>Welcome to the HR System Dashboard!</h1>
      <button style={styles.button} onClick={logout}>Logout</button>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  button: { padding: "10px 20px", fontSize: "16px", cursor: "pointer" }
};

export default Dashboard;
