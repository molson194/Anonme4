<script context="module" lang="ts">
	import type { Load, LoadInput } from '@sveltejs/kit'
	import { refreshTokenIfNeeded } from '$lib/auth';
	import { browser } from '$app/env'; 

	export const load: Load = ({url, session} : LoadInput) => {
		if (browser) {
			refreshTokenIfNeeded(session, document, location)
		}

		if (url.pathname != "/login"
		    && url.pathname != "/signup"
		    && url.pathname != "/confirm"
				&& !session.accessTokenExists) {
			return {
				status: 302,
				redirect: `/login?referrer=${encodeURIComponent(url.pathname)}`
			}
		}

		return {};
	}
</script>

<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	import { session } from '$app/stores';
</script>

{#if $session.accessTokenExists}
	<Header />
{/if}

<main>
	<slot />
</main>

<footer>
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
