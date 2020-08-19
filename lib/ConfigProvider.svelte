<script>
  import { setContext } from 'svelte';
  import { queryConfigContext, getQueryConfig } from './context';

  export let config;

  let prevConfig = getQueryConfig();

  let newConfig = {
    shared: {
      ...prevConfig.shared || {},
      ...config.shared || {},
    },
    queries: {
      ...prevConfig.queries || {},
      ...config.queries || {},
    },
    mutations: {
      ...prevConfig.mutations || {},
      ...config.mutations || {},
    },
  };

  setContext(queryConfigContext, newConfig);
</script>

<slot></slot>
