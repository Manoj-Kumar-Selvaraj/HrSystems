import React, { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";

const LoginCallback = () => {
  const { oktaAuth } = useOktaAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function handleCallback() {
      await oktaAuth.handleLoginRedirect();
      navigate("/dashboard");
    }
    handleCallback();
  }, [oktaAuth, navigate]);

  return <div>Loading...</div>;
};

export default LoginCallback;
