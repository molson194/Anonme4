<script lang="ts">
	import type { Message } from '@prisma/client';
	export let messages: Message[]
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

	<form method="post">
		<input type="text" name="text" />
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
