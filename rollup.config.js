import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import esbuild from 'rollup-plugin-esbuild';


let watch = !!process.env.ROLLUP_WATCH;

/** @type {import('rollup').RollupOptions} */
let config = {
  input: './lib/index.js',
  output: [
    {
      file: './dist/svelte-query.js',
      format: 'cjs',
    },
    {
      file: './dist/svelte-query.mjs',
      format: 'esm',
    },
    !watch && {
      file: './dist/svelte-query.min.js',
      format: 'cjs',
      plugins: [
        terser(),
      ],
    },
    !watch && {
      file: './dist/svelte-query.min.mjs',
      format: 'esm',
      plugins: [
        terser(),
      ],
    },
  ],
  external: ['svelte', 'svelte/internal'],
  plugins: [
    svelte({ immutable: true }),
    esbuild({ target: 'es6', watch }),
  ],
};

export default config;
