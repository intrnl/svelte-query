import { getQueryArgs } from './core/utils.js';
import { getQueryConfig } from './context.js';


export function useQueryArgs (args) {
  let configContext = getQueryConfig();

  let [queryKey, config, ...rest] = getQueryArgs(args);

  config = {
    ...configContext.shared,
    ...configContext.queries,
    ...config,
  };

  return [queryKey, config, ...rest];
}

export function createQueryInfo (query) {
  return {
    ...query,
    ...query.state,
    query,
  };
}
