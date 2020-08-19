import { derived } from 'svelte/store';
import type { Readable } from 'svelte/store';
import { PaginatedQueryResult, QueryStatus } from './core';
import { getStatusProps } from './core/utils';
import { baseQuery } from './base-query';
import { useQueryArgs } from './utils';


// Paginated query is like a "lag" query,
// as the query changes, we need to keep results from the last query and use
// them as placeholder data while we load the next one
// Due to how Svelte works, holding on to the previous result isn't possible
// without us having an intermediary function
export function createPaginatedQuery () {
  // Keep track of the latest data result
  let lastDataRef: any;

  return function paginatedQuery<Result, Error> (
    ...args: any[]
  ): Readable<PaginatedQueryResult<Result, Error>> {
    let [key, config] = useQueryArgs<Result, Error>(args);

    // If the latest data is already present, initialData becomes unnecessary
    if (lastDataRef !== undefined) {
      delete config.initialData;
    }

    // Make the query as usual
    let query = baseQuery(key, config);

    return derived(query, ($query) => {
      // Get the real data and status from query
      let { data: latestData, status } = $query.query.state;

      // If query is disabled, get rid of latest data if query is disabled
      if ($query.query.config.enabled) {
        lastDataRef = undefined;
      }

      // If the query succeeds, update latest data result
      if (status === 'success' && latestData !== undefined) {
        lastDataRef = latestData;
      }

      // "Resolved" data should either be the latest one, or the previous one
      // if it's not available yet
      let resolvedData = latestData === undefined
        ? lastDataRef
        : latestData;

      // Pretend the query succeed even though it's still loading, if the
      // previous one is available
      if (status === QueryStatus.Success && resolvedData !== undefined) {
        let overrides = getStatusProps(QueryStatus.Success);
        Object.assign($query.query.state, overrides);
        Object.assign($query, overrides);
      }

      return {
        ...$query,
        resolvedData,
        latestData,
      };
    });
  }
}
