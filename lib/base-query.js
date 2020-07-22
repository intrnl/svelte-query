import { readable } from 'svelte/store';
import { getQueryCache } from './context.js';
import { createQueryInfo } from './utils.js';


export function baseQuery (queryKey, config = {}) {
  let queryCache = getQueryCache();
  let query = queryCache.buildQuery(queryKey, config);

  return readable(createQueryInfo(query), function (set) {
    function notify () {
      set(createQueryInfo(query));
    }

    let instance = query.subscribe(notify);
    instance.updateConfig(config);

    notify();

    if (config.enabled) {
      instance.run();
    }

    return instance.unsubscribe;
  });
}
