import pkg from './package.json';

import svelte from 'rollup-plugin-svelte';
import esbuild from 'rollup-plugin-esbuild';


let watch = !!process.env.ROLLUP_WATCH;

/** @type {import('rollup').RollupOptions} */
let newConfig = {
	input: pkg.source,
	output: [
		{ file: pkg.module, format: 'esm' },
		{ file: pkg.main, format: 'cjs' },
	],

	external: ['svelte', 'svelte/internal', 'svelte/store'],
	plugins: [
		svelte({ immutable: true }),
		esbuild({
			watch,
			include: '**/*.{ts,svelte}',
		}),
	],
};

export default newConfig;
