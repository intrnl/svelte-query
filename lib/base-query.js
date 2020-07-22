import { readable } from './utils.js';
import { getQueryCache } from './context.js';
import { createQueryInfo } from './utils.js';


export function baseQuery (queryKey, config = {}) {
  return readable({}, function (set) {
    let queryCache = getQueryCache();
    let query = queryCache.buildQuery(queryKey, config);

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
