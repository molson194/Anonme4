<script context="module" lang="ts">
	import type { Load, LoadInput } from '@sveltejs/kit'
	import { refreshTokenIfNeeded } from '$lib/auth';
	import { browser } from '$app/env'; 

	export const load: Load = async ({fetch, params, session} : LoadInput) => {
		if (browser) {
			refreshTokenIfNeeded(session, document, location)
		}

		const response = await fetch(`/api/groups/${params.id}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			}
		})

		var responseData: { messages: Message[] } = await response.json()
		return {
			props: {
				messages: responseData.messages
			}
		};
	}
</script>

<script lang="ts">
	import type { Message } from '@prisma/client';
	import { page } from '$app/stores';
	export let messages: Message[]

	let newMessage = '';

	async function onSubmit() {
		// TODO: Disable button
		const response = await fetch(`/api/groups${$page.url.pathname}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({ newMessage: newMessage })
		})

		newMessage = ''
		const responseData : {message: Message} = await response.json()
		messages = [...messages, responseData.message]

		// TODO: re-enable button
	}
</script>

<svelte:head>
	<title>Messages</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="messages">
	<h1>Messages</h1>

	{#each messages as message (message.id)}
		<p>{message.text}</p>
	{/each}

	<form on:submit|preventDefault={onSubmit}>
		<input bind:value={newMessage} type="text" placeholder="Message text..." />
		<button type="submit">Send</button>
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
