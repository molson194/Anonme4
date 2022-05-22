import type { Handle, GetSession } from '@sveltejs/kit';
import { CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	return response;
};

export const getSession : GetSession = (request) => {
	var poolData = {
		UserPoolId: 'us-west-2_0TZ1kwGbm',
		ClientId: '3fgh7ffl69lao12371amvo3uso',
	};
	
	var userPool = new CognitoUserPool(poolData);
	var cognitoUser = userPool.getCurrentUser();

	var accessToken = null
	cognitoUser?.getSession(function(error: null | Error, session : CognitoUserSession | null){
		if (session != null) {
			accessToken = session.getAccessToken().getJwtToken()
		}
	})

	return {
		accessToken: accessToken
	}
}