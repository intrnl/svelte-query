import type { Readable } from 'svelte/store';
import type {
	QueryFunction,
	TypedQueryFunction,
	TypedQueryFunctionArgs,
	QueryKey,
	QueryResult,
	QueryConfig,
} from './core/types';
import { baseQuery } from './base-query';
import { getQueryArgs } from './core/utils';


// Parameter syntax with optional config
export function query<Result = unknown, Error = unknown> (
	queryKey: QueryKey,
	queryConfig?: QueryConfig<Result, Error>
): UseQueryResult<Result, Error>

// Parameter syntax with query function and optional config
export function query<Result, Error, Args extends TypedQueryFunctionArgs> (
	queryKey: QueryKey,
	queryFn: TypedQueryFunction<Result, Args>,
	queryConfig?: QueryConfig<Result, Error>
): UseQueryResult<Result, Error>

export function query<Result = unknown, Error = unknown> (
	queryKey: QueryKey,
	queryFn: QueryFunction<Result>,
	queryConfig?: QueryConfig<Result, Error>
): UseQueryResult<Result, Error>

// Object syntax
export function query<Result = unknown, Error = unknown> (
	config: UseQueryObjectConfig<Result, Error>
): UseQueryResult<Result, Error>

// Implementation
export function query<Result, Error> (
	...args: any[]
): UseQueryResult<Result, Error> {
	let conf = getQueryArgs<Result, Error>(args)[1];
	return baseQuery(conf);
}


export interface UseQueryResult<Result, Error>
extends Readable<QueryResult<Result, Error>> {
	configure (newConfig: Partial<QueryConfig<Result, Error>>): void
	refetch (key: QueryKey): void,
}

export interface UseQueryObjectConfig<Result, Error> {
	queryKey?: QueryKey,
	queryFn?: QueryFunction<Result>,
	config?: QueryConfig<Result, Error>,
}
