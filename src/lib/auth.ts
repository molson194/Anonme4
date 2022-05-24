import { parse } from 'cookie';
import { CognitoJwtVerifier } from "aws-jwt-verify";

const verifier = CognitoJwtVerifier.create({
  userPoolId: "us-west-2_0TZ1kwGbm",
  tokenUse: "access",
  clientId: "3fgh7ffl69lao12371amvo3uso",
});

export async function validate(headers : Headers) {
  const cookies = parse(headers.get("cookie") || "")
	if (!cookies.accessToken) {
		throw new Error("No token in cookies")
	}

  await verifier.verify(cookies.accessToken);
}