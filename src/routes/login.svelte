<script lang="ts">
  import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
  import { goto } from '$app/navigation';
  import { session } from '$app/stores';
  import { userPoolId, clientId } from '$lib/auth';

  let username = '';
  let password = '';

  var poolData = {
      UserPoolId: userPoolId,
      ClientId: clientId,
    };

  const userPool = new CognitoUserPool(poolData)

  async function onSubmit() {
    var authenticationData = {
      Username: username,
      Password: password,
    };
    
    const authenticationDetails = new AuthenticationDetails(authenticationData)

    var userData = {
      Username: username,
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
    <input bind:value={username} type="text" placeholder="Email" />
    <input bind:value={password} type="password" placeholder="Password" />
		<button type="submit">Login</button>
	</form>
</div>