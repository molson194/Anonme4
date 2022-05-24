import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import resolve from "@rollup/plugin-node-resolve";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		// Fixes global is not defined error
		vite: {
			define: {
					global: {}
			},
			build: {
				rollupOptions: {
					plugins: [resolve({ browser: true })]
				}
			}
		}
	}
};

export default config;
