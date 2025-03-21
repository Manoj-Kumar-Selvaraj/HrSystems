import React, { useEffect, useRef } from "react";
import { useOktaAuth } from "@okta/okta-react";
import OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";

const Login = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const widgetRef = useRef(null);

  useEffect(() => {
    const widget = new OktaSignIn({
      baseUrl: "https://okta.manoj-techworks.site",  // Your Okta custom domain
      clientId: "0oanwc9h6wnB5YrOo5d7",
      redirectUri: "https://okta.manoj-techworks.site/login/callback",
      authParams: {
        issuer: "https://okta.manoj-techworks.site/oauth2/default",
        responseType: ["token", "id_token"],
        display: "page",
      },
      features: {
        registration: true, // Enable self-service registration (if needed)
        rememberMe: true,
        multiOptionalFactorEnroll: true,
      },
      logo: "/custom-logo.png", // Set a custom logo (Place your logo inside /public folder)
    });

    if (!authState?.isAuthenticated) {
      widget.renderEl(
        { el: widgetRef.current },
        () => {},  // Success callback
        (err) => console.error("Okta Widget Error:", err)
      );
    }

    return () => widget.remove(); // Cleanup on unmount
  }, [authState]);

  if (authState?.isAuthenticated) {
    window.location.href = "/dashboard"; // Redirect authenticated users
    return null;
  }

  return (
    <div style={styles.container}>
      <h1>HR System Login</h1>
      <div ref={widgetRef} /> {/* Okta Sign-In Widget will render here */}
    </div>
  );
};

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
};

export default Login;
