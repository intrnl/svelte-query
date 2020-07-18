import { baseQuery } from './base-query';
import { useQueryArgs } from './utils.js';

export function query (...args) {
  let queryInfo = baseQuery(...useQueryArgs(args));
  return queryInfo;
}

export function infiniteQuery (...args) {
  let [queryKey, config] = useQueryArgs(args);

  config.infinite = true;

  let queryInfo = baseQuery(queryKey, config);
  return queryInfo;
}

export function paginatedQuery (...args) {
  let [queryKey, config] = useQueryArgs(args);

  
}
