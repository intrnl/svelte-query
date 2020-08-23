import type { Readable } from 'svelte/store';
import type {
	QueryFunction,
	TypedQueryFunction,
	TypedQueryFunctionArgs,
	QueryKey,
	InfiniteQueryResult,
	InfiniteQueryConfig,
} from './core/types';
import { baseQuery } from './base-query';
import { getQueryArgs } from './core/utils';


// Parameter syntax with optional config
export function infiniteQuery<Result = unknown, Error = unknown> (
	queryKey: QueryKey,
	queryConfig?: InfiniteQueryConfig<Result, Error>
): UseInfiniteQueryResult<Result, Error>

// Parameter syntax with query function and optional config
export function infiniteQuery<Result, Error, Args extends TypedQueryFunctionArgs> (
	queryKey: QueryKey,
	queryFn: TypedQueryFunction<Result, Args>,
	queryConfig?: InfiniteQueryConfig<Result, Error>
): UseInfiniteQueryResult<Result, Error>

export function infiniteQuery<Result = unknown, Error = unknown> (
	queryKey: QueryKey,
	queryFn: QueryFunction<Result>,
	queryConfig?: InfiniteQueryConfig<Result, Error>
): UseInfiniteQueryResult<Result, Error>

// Object syntax
export function infiniteQuery<Result = unknown, Error = unknown> (
	config: UseInfiniteQueryObjectConfig<Result, Error>
): UseInfiniteQueryResult<Result, Error>

// Implementation
export function infiniteQuery<Result, Error> (
	...args: any[]
): UseInfiniteQueryResult<Result, Error> {
	let conf = getQueryArgs<Result[], Error>(args)[1];
	return baseQuery({ ...conf, infinite: true });
}


export interface UseInfiniteQueryResult<Result, Error>
extends Readable<InfiniteQueryResult<Result, Error>> {
	configure (newConfig: Partial<InfiniteQueryConfig<Result, Error>>): void,
	refetch (key: QueryKey): void,
}

export interface UseInfiniteQueryObjectConfig<Result, Error> {
	queryKey: QueryKey,
	queryFn?: QueryFunction<Result>,
	config?: InfiniteQueryConfig<Result, Error>,
}
