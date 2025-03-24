import { OktaAuth } from "@okta/okta-auth-js";

const oktaAuth = new OktaAuth({
  issuer: "https://dev-42945365.okta.com/oauth2/default",
  clientId: "0oanwc9h6wnB5YrOo5d7",
  redirectUri: "https://okta.manoj-techworks.site/login/callback",
  postLogoutRedirectUri: "https://okta.manoj-techworks.site",
  scopes: ["openid", "profile", "email"],
  pkce: true, 
  tokenManager: {
    autoRenew: true,  // ✅ Automatically renew tokens
    secure: true,     // ✅ Secure storage
    storage: "sessionStorage", // ✅ Secure token storage
  }
});

// ✅ Token refresh every 30 seconds (only if expired)
setInterval(async () => {
  try {
    const accessToken = await oktaAuth.tokenManager.get("accessToken");
    if (!accessToken || accessToken.expiresAt * 1000 < Date.now()) {
      await oktaAuth.token.getWithoutPrompt();
    }
  } catch (err) {
    console.error("Token refresh failed:", err);
  }
}, 30000); // Every 30 seconds

export default oktaAuth;
