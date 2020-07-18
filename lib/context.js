import { getContext } from 'svelte';
import { queryCache as defaultQueryCache } from './core/index.js';
import { defaultConfigRef } from './core/config.js';

export let queryConfigContext = '__svelte-query_config';
export let queryCacheContext = '__svelte-query_cache';

export function getQueryCache () {
  return getContext(queryCacheContext) || defaultQueryCache;
}

export function getQueryConfig () {
  return getContext(queryConfigContext) || defaultConfigRef.current;
}
