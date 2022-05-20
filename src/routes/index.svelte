<script lang="ts">
	import type { Org } from '@prisma/client';
	export let orgs: Org[]
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="groups">
	<h1>Groups</h1>

	{#each orgs as org (org.id)}
		<a href="/{org.id}">{org.name}</a>
	{/each}

	<form method="post">
		<input type="text" name="name" />
		<button type="submit">Submit</button>
	</form>

</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}
</style>
