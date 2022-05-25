<script lang="ts">
  import { CognitoUser } from 'amazon-cognito-identity-js';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { userPool } from '$lib/auth';

  let username = $page.url.searchParams.get('username')
  let code = ''

  const referrer = $page.url.searchParams.get('referrer') || ""

  if (username == null) {
    goto(`${$page.url.protocol}//${$page.url.hostname}:${$page.url.port}/signup`)
  }

  async function onSubmit() {
    var userData = {
      Username: decodeURIComponent(username!),
      Pool: userPool,
    };

    var cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, function(err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }

      goto(`${$page.url.protocol}//${$page.url.hostname}:${$page.url.port}/login?username=${encodeURIComponent(username!)}&referrer=${encodeURIComponent(referrer)}`)
    });
  }
</script>

<svelte:head>
	<title>Signup</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="signup">
	<h1>Signup</h1>

  <form on:submit|preventDefault={onSubmit}>
    <input bind:value={code} type="text" placeholder="Confirmation code" />
		<button type="submit">Confirm</button>
	</form>
</div>