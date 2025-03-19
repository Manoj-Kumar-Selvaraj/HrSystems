const oktaConfig = {
    clientId: "0oanwc9h6wnB5YrOo5d7",
    issuer: "https://dev-42945365.okta.com/oauth2/default",
    redirectUri: window.location.origin + "/login/callback",
    scopes: ["openid", "profile", "email"],
    pkce: true
  };
  
  export default oktaConfig;
  