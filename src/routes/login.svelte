<script lang="ts">
  import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
  import { goto } from '$app/navigation';
  import { session } from '$app/stores';

  async function onSubmit() {
    var poolData = {
      UserPoolId: 'us-west-2_0TZ1kwGbm',
      ClientId: '3fgh7ffl69lao12371amvo3uso',
    };

    const userPool = new CognitoUserPool(poolData)

    var authenticationData = {
      Username: 'molson194+test1@gmail.com',
      Password: '****',
    };
    
    const authenticationDetails = new AuthenticationDetails(authenticationData)

    var userData = {
      Username: 'molson194+test1@gmail.com',
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData)

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        console.log("Successfully stored tokens to cookies")
        var expiration = new Date(result.getAccessToken().getExpiration() * 1000)
        document.cookie = `accessToken=${result.getAccessToken().getJwtToken()}; expires=${expiration.toUTCString()}`
        $session.accessToken = "exists"

        // TODO: redirect to home page OR expected group
        goto(`${window.location.protocol}//${window.location.hostname}:${window.location.port}`)
      },

      onFailure: function(err) {
        console.log("Error getting tokens")
        alert(err)
      }
    })
  }
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="login">
	<h1>Login</h1>

  <form on:submit|preventDefault={onSubmit}>
		<button type="submit">Login</button>
	</form>
</div>