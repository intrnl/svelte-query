import { readable } from 'svelte/store';
import { getQueryCache } from './context.js';


export let isFetching = readable(false, function (set) {
  let queryCache = getQueryCache();
  let prev = queryCache.isFetching;

  return queryCache.subscribe((cache) => {
    let curr = cache.isFetching;

    if (prev !== curr) {
      set(curr);
      prev = curr;
    }
  });
});
