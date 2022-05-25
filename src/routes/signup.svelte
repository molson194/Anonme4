<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { userPool } from '$lib/auth';

  let username = '';
  let password = '';

  const referrer = $page.url.searchParams.get('referrer') || ""

  async function onSubmit() {
    userPool.signUp(username, password, [], [], function(err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      
      goto(`${$page.url.protocol}//${$page.url.hostname}:${$page.url.port}/confirm?username=${encodeURIComponent(username)}&referrer=${encodeURIComponent(referrer)}`)
    })
  }
</script>

<svelte:head>
	<title>Signup</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="signup">
	<h1>Signup</h1>

  <form on:submit|preventDefault={onSubmit}>
    <input bind:value={username} type="text" placeholder="Email" />
    <input bind:value={password} type="password" placeholder="Password" />
		<button type="submit">Sign Up</button>
	</form>
</div>