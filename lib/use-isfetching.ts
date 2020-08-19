import type { Readable } from 'svelte/store';
import { getQueryCache } from './context';


export let isFetching: Readable<number> = {
  subscribe (listener) {
    function notify (value: number) {
      try { listener(value) } catch {}
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
