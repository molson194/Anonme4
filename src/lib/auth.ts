import { parse } from 'cookie';
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { CognitoUserPool } from 'amazon-cognito-identity-js';

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