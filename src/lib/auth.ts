import { parse } from 'cookie';
import { CognitoJwtVerifier } from "aws-jwt-verify";
import type { CognitoAccessTokenPayload } from 'aws-jwt-verify/jwt-model';

export const clientId = "3fgh7ffl69lao12371amvo3uso"
export const userPoolId = "us-west-2_0TZ1kwGbm"

const verifier = CognitoJwtVerifier.create({
  userPoolId: userPoolId,
  tokenUse: "access",
  clientId: clientId,
});

export async function validate(headers : Headers) : Promise<CognitoAccessTokenPayload> {
  const cookies = parse(headers.get("cookie") || "")
	if (!cookies.accessToken) {
		throw new Error("No token in cookies")
	}

  return await verifier.verify(cookies.accessToken);
}