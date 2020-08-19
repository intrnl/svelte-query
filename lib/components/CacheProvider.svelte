<script>
	import { onMount, setContext } from 'svelte';
	import { queryCacheContext } from '../context';
	import { makeQueryCache, queryCaches } from '../core';

	export let queryCache;

	let resolvedQueryCache = queryCache || makeQueryCache();

	setContext(queryCacheContext, resolvedQueryCache);

	onMount(() => {
		queryCaches.push(resolvedQueryCache);

		return () => {
			let i = queryCaches.indexOf(resolvedQueryCache);

			if (i > -1) {
				queryCaches.splice(i, 1);
			}
			if (!queryCache) {
				resolvedQueryCache.clear({ notify: false });
			}
		};
	});
</script>

<slot></slot>
