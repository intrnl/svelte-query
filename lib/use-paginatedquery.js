import { derived } from './utils.js';
import { baseQuery } from './base-query.js';
import { useQueryArgs } from './utils.js';
import { getStatusBools } from './core/utils.js';


// Paginated query is like a "lag" query,
// as the query changes, we need to keep results from the last query and use
// them as placeholder data while we load the next one
// Due to how Svelte works, holding on to the previous result isn't possible
// without "instantiating" it first
export function createPaginatedQuery () {
  // Keep track of the latest data result
  let lastDataRef;

  return function paginatedQuery (...args) {
    let [queryKey, config] = useQueryArgs(args);

    // If the latest data is already present, initialData becomes unnecessary
    if (lastDataRef !== undefined) {
      delete config.initialData;
    }

    // Make the query as normal
    let queryInfo = baseQuery(queryKey, config);

    return derived(queryInfo, ($queryInfo) => {
      // Get data and status from the real query
      let { data: latestData, status } = $queryInfo;

      // Get rid of latest data if query is disabled,
      // This is placed inside the derived store because the baseQuery function
      // returns a store that needs to be subscribed first
      if (!$queryInfo.query.config.enabled) {
        lastDataRef = undefined;
      }

      // If the real query succeeds, update latest data result
      if (status === 'success' && latestData !== undefined) {
        lastDataRef = latestData;
      }

      // "Resolved" data should either be the latest one, or the previous one
      // if it is not available yet
      let resolvedData = latestData === undefined
        ? lastDataRef
        : latestData;

      // Even if the real query is still loading, we can pretend that the query
      // has succeeded if the previous one is available.
      if (resolvedData !== undefined) {
        let overrides = { status: 'success', ...getStatusBools('success') };
        Object.assign($queryInfo.query.state, overrides);
        Object.assign($queryInfo, overrides);
      }

      let paginatedQueryInfo = {
        ...$queryInfo,
        resolvedData,
        latestData,
      };

      return paginatedQueryInfo;
    });
  }
}
