import { readable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import type { QueryKey, QueryConfig, QueryResultBase } from './core/types';
import { getQueryCache } from './context';
import { getQueryInfo } from './utils';


export function baseQuery<Result, Error> (
  key: QueryKey,
  config: QueryConfig<Result, Error> = {}
): Readable<QueryResultBase<Result, Error>> {
  let queryCache = getQueryCache();
  let query = queryCache.buildQuery(key, config);

  return readable(getQueryInfo(query), (set) => {
    function notify () {
      set(getQueryInfo(query));
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

