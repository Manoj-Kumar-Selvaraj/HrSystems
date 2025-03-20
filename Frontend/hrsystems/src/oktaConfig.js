import { OktaAuth } from "@okta/okta-auth-js";

const oktaAuth = new OktaAuth({
  issuer: "https://dev-42945365.okta.com",
  clientId: "0oanwc9h6wnB5YrOo5d7",
  redirectUri: "https://okta.manoj-techworks.site/login/callback",
  postLogoutRedirectUri: "https://okta.manoj-techworks.site",
  scopes: ["openid", "profile", "email"],
  pkce: true, 
});

export default oktaAuth;
