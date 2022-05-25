<script context="module" lang="ts">
	import type { Load, LoadInput } from '@sveltejs/kit'
	import { refreshTokenIfNeeded } from '$lib/auth';
	import { browser } from '$app/env'; 

	export const load: Load = async ({fetch, session} : LoadInput) => {
		if (browser) {
			refreshTokenIfNeeded(session, document, location)
		}

		const response = await fetch('/api/groups', {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			}
		})

		var responseData: { orgs: Org[] } = await response.json()
		return {
			props: {
				orgs: responseData.orgs
			}
		};
	}
</script>

<script lang="ts">
	import type { Org } from '@prisma/client';
	export let orgs: Org[]

	let groupName = '';

	async function onSubmit() {
		// TODO: Disable button
    const response = await fetch('/api/groups', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({ groupName: groupName })
		})

		groupName = ''
		const responseData : {org: Org} = await response.json()
		orgs = [...orgs, responseData.org]

		// TODO: re-enable button
  }
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

	<form on:submit|preventDefault={onSubmit}>
		<input bind:value={groupName} type="text" placeholder="New Group Name" />
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
