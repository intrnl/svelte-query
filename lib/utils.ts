import { getQueryArgs } from './core/utils';
import type { Query } from './core';
import type { QueryConfig, QueryKey, QueryResultBase } from './core/types';
import { getQueryConfig } from './context';


export function useQueryArgs<Result, Error, Options = undefined> (
  args: any[]
): [QueryKey, QueryConfig<Result, Error>, Options] {
  let context = getQueryConfig();

  let [key, config, opts] = getQueryArgs<Result, Error, Options>(args);

  let final = {
    ...context.shared,
    ...context.queries,
    ...config,
  } as QueryConfig<Result, Error>;

  return [key, final, opts];
}

export function getQueryInfo<Result, Error> (
  query: Query<Result, Error>
): QueryResultBase<Result, Error> {
  return {
    query,
    ...query.state,
    clear: query.clear.bind(query),
    refetch: query.refetch.bind(query),
  };
}
