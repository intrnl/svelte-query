<script>
	import { setContext } from 'svelte';
	import { mergeReactQueryConfigs } from '../core/config';
	import { queryConfigContext, getQueryConfig } from '../context';

	export let config;

	let prevConfig = getQueryConfig();

	let newConfig = prevConfig
		? mergeReactQueryConfigs(prevConfig, config)
		: config;

	setContext(queryConfigContext, newConfig);
</script>

<slot></slot>
