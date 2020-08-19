import { derived } from 'svelte/store';
import type { Readable } from 'svelte/store';
import type { QueryResult, InfiniteQueryResult } from './core';
import { baseQuery } from './base-query';
import { useQueryArgs } from './utils';


export function query<Result, Error> (...args: any[]): Readable<QueryResult<Result, Error>> {
  let [key, config] = useQueryArgs<Result, Error>(args);
  let query = baseQuery(key, config);
  
  return derived(query, ($query) => ({
    ...$query,
    data: $query.query.state.data,
  }));
}

export function infiniteQuery<Result, Error> (
  ...args: any[]
): Readable<InfiniteQueryResult<Result, Error>> {
  let [key, config] = useQueryArgs<Result[], Error>(args);
  config.infinite = true;

  let query = baseQuery(key, config);

  return derived(query, ($query) => ({
    ...$query,
    data: $query.query.state.data,
    canFetchMore: $query.query.state.canFetchMore,
    fetchMore: $query.query.fetchMore.bind($query.query),
  }));
}
