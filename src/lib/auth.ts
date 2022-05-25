import { parse } from 'cookie';
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';

const clientId = "3fgh7ffl69lao12371amvo3uso"
const userPoolId = "us-west-2_0TZ1kwGbm"

const verifier = CognitoJwtVerifier.create({
  userPoolId: userPoolId,
  tokenUse: "access",
  clientId: clientId,
});

var poolData = {
  UserPoolId: userPoolId,
  ClientId: clientId,
};

export const userPool = new CognitoUserPool(poolData)

export async function validate(headers : Headers) {
  const cookies = parse(headers.get("cookie") || "")
	if (!cookies.accessToken) {
		throw new Error("No token in cookies")
	}

  return await verifier.verify(cookies.accessToken);
}

export async function refreshTokenIfNeeded(session : App.Session, document: Document, location: Location) {
  const cookies = parse(document.cookie)
	if (cookies.accessToken) {
    // Access token exists. No need to refresh
    return;
  }

  let cognitoUser = userPool.getCurrentUser()
  cognitoUser?.getSession(function(oldError : Error | null, oldSession: CognitoUserSession | null)  {
    if (oldError) {
      session.accessTokenExists = false
      alert(oldError.message || JSON.stringify(oldError))
      return
    }

    cognitoUser!.refreshSession(oldSession!.getRefreshToken(), function(newError, newSession) {
      if (newError) {
        session.accessTokenExists = false
        alert(newError.message || JSON.stringify(newError))
        return
      }

      var expiration = new Date(newSession.getAccessToken().getExpiration() * 1000)
      document.cookie = `accessToken=${newSession.getAccessToken().getJwtToken()}; expires=${expiration.toUTCString()}`
      session.accessTokenExists = true
      location.reload()
    })
  })
}