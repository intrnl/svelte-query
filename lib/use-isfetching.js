import { getQueryCache } from './context.js';
import { readable } from './utils.js';


export let isFetching = readable(0, (set) => {
  let queryCache = getQueryCache();
  set(queryCache.isFetching);

  return queryCache.subscribe((cache) => {
    set(cache.isFetching);
  });
});
