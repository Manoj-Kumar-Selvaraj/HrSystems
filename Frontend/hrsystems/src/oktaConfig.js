import { OktaAuth } from "@okta/okta-auth-js";

const oktaConfig = {
  clientId: "your-client-id",
  issuer: "https://dev-42945365.okta.com/oauth2/default",
  redirectUri: window.location.origin + "/login/callback",
  scopes: ["openid", "profile", "email"],
};

const oktaAuth = new OktaAuth(oktaConfig);

export default oktaAuth;
