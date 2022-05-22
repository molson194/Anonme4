<script context="module" lang="ts">
	import type { Load, LoadInput } from '@sveltejs/kit'
  import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

  export const load: Load = ({url, session} : LoadInput) => {
    var poolData = {
      UserPoolId: 'us-west-2_0TZ1kwGbm',
      ClientId: '3fgh7ffl69lao12371amvo3uso',
    };

    var authenticationData = {
      Username: 'molson194+test1@gmail.com',
      Password: '****',
    };

    const userPool = new CognitoUserPool(poolData)
    
    const authenticationDetails = new AuthenticationDetails(authenticationData)

    var userData = {
      Username: 'molson194+test1@gmail.com',
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData)

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        console.log("Successfully stored tokens to localstorage")
        session.accessToken = result.getAccessToken().getJwtToken()
        // TODO: redirect to home page OR expected group
      },

      onFailure: function(err) {
        console.log("Error getting tokens")
        alert(err)
      }
    })

    return {};
  }
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="login">
	<h1>Login</h1>

  <form method="post">
		<button type="submit">Login</button>
	</form>
</div>