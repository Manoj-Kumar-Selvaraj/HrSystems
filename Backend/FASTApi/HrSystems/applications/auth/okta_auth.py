import requests
from fastapi import Depends, HTTPException, Security
from fastapi.security import OAuth2AuthorizationCodeBearer
from jose import jwt
from jose.exceptions import JWTError
from functools import lru_cache

# Your Okta details
OKTA_DOMAIN = "https://dev-42945365.okta.com"
OKTA_AUDIENCE = "api://default"
OKTA_ISSUER = f"{OKTA_DOMAIN}/oauth2/default"

oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl=f"{OKTA_DOMAIN}/oauth2/default/v1/authorize",
    tokenUrl=f"{OKTA_DOMAIN}/oauth2/default/v1/token"
)

@lru_cache
def get_okta_public_keys():
    """ Retrieve and cache Okta public keys for JWT verification """
    jwks_url = f"{OKTA_ISSUER}/v1/keys"
    response = requests.get(jwks_url)
    response.raise_for_status()
    return response.json()

def get_public_key(kid):
    """ Get the public key from the JWKS endpoint """
    keys = get_okta_public_keys()["keys"]
    for key in keys:
        if key["kid"] == kid:
            return jwt.construct_rsa_public_key(key)
    raise HTTPException(status_code=401, detail="Invalid key ID")

async def get_current_user(token: str = Security(oauth2_scheme)):
    """ Validate the Okta JWT token """
    try:
        # Decode the token header to get the key ID (kid)
        unverified_header = jwt.get_unverified_header(token)
        public_key = get_public_key(unverified_header["kid"])
        
        # Decode and verify JWT
        payload = jwt.decode(
            token,
            public_key,
            algorithms=["RS256"],
            audience=OKTA_AUDIENCE,
            issuer=OKTA_ISSUER
        )
        
        return payload  # Return user claims
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
