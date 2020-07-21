import { getQueryCache } from './context.js';


// Svelte's stores are instantiated once for all subscribers, which is an issue
// because we can't expect getQueryCache to return the same query cache when
// we let users to instantiate their own query cache.
export let isFetching = {
  subscribe (listener) {
    function notify (value) {
      try {
        listener(value);
      } catch {}
    }

    let queryCache = getQueryCache();
    let prev = queryCache.isFetching;

    notify(prev);

    return queryCache.subscribe((cache) => {
      let curr = cache.isFetching;

      if (curr !== prev) {
        notify(curr);
        prev = curr;
      }
    });
  },
};
