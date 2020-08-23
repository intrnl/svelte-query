import { getDefaultedQueryConfig } from './core/config';
import type { QueryConfig } from './core/types';
import { getQueryConfig, getQueryCache } from './context';


export function useDefaultedQueryConfig<Result, Error> (
	config?: QueryConfig<Result, Error>
): QueryConfig<Result, Error> {
	let contextConfig = getQueryConfig();
	let contextQueryCache = getQueryCache();

	let queryCache = config?.queryCache || contextQueryCache;
	let queryCacheConfig = queryCache.getDefaultConfig();

	return getDefaultedQueryConfig(queryCacheConfig, contextConfig, config, {
		queryCache,
	});
}
