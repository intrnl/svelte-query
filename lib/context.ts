import { getContext } from 'svelte';
import { queryCache as defaultQueryCache } from './core';
import { defaultConfigRef } from './core/config';
import type { QueryCache } from './core';
import type { ReactQueryConfig } from './core/types';


export let queryConfigContext = '__svelte_query_config';
export let queryCacheContext = '__svelte_query_cache';

export function getQueryCache (): QueryCache {
  return getContext(queryCacheContext) || defaultQueryCache;
}

export function getQueryConfig (): ReactQueryConfig {
  return getContext(queryConfigContext) || defaultConfigRef.current;
}
