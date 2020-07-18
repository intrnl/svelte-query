<script>
  import { setContext } from 'svelte';
  import { queryConfigContext, getQueryConfig } from './context.js';

  export let config;

  let prevContextValue = getQueryConfig();

  let newConfig = {
    shared: {
      ...(prevContextValue.shared || {}),
      ...(config.shared || {}),
    },
    queries: {
      ...(prevContextValue.queries || {}),
      ...(config.queries || {}),
    },
    mutations: {
      ...(prevContextValue.mutations || {}),
      ...(config.mutations || {}),
    },
  };

  setContext(queryConfigContext, newConfig);
</script>

<slot></slot>
