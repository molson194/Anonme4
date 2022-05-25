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

		var responseData: { messages: Message[], hasAccess: boolean } = await response.json()
		return {
			props: {
				messages: responseData.messages,
				hasAccess: responseData.hasAccess
			}
		};
	}
</script>

<script lang="ts">
	import type { Message } from '@prisma/client';
	import { page } from '$app/stores';
	export let messages: Message[]
	export let hasAccess: boolean

	let newMessage = '';
	let accessCode = ''

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

	async function joinGroup() {
		const response = await fetch(`/api/groups${$page.url.pathname}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({ accessCode: accessCode })
		})

		accessCode = ''
		const responseData : {messages: Message[], hasAccess: boolean} = await response.json()
		messages = responseData.messages
		hasAccess = responseData.hasAccess
	}
</script>

<svelte:head>
	<title>Messages</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

{#if !hasAccess}
	<div class="accessCode">
		<h1>Access Code</h1>
		<form on:submit|preventDefault={joinGroup}>
			<input bind:value={accessCode} type="text" placeholder="Access code" />
			<button type="submit">Join Group</button>
		</form>
	</div>
{:else}
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
{/if}

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
