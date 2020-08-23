import { derived } from 'svelte/store';
import type { Readable } from 'svelte/store';
import type {
	QueryFunction,
	TypedQueryFunction,
	TypedQueryFunctionArgs,
	QueryKey,
	PaginatedQueryResult,
	PaginatedQueryConfig,
} from './core/types';
import { baseQuery } from './base-query';
import { getQueryArgs } from './core/utils';


// Parameter syntax with optional config
export function paginatedQuery<Result = unknown, Error = unknown> (
	queryKey: QueryKey,
	queryConfig?: PaginatedQueryConfig<Result, Error>
): UsePaginatedQueryResult<Result, Error>

// Parameter syntax with query function and optional config
export function paginatedQuery<Result, Error, Args extends TypedQueryFunctionArgs> (
	queryKey: QueryKey,
	queryFn: TypedQueryFunction<Result, Args>,
	queryConfig?: PaginatedQueryConfig<Result, Error>
): UsePaginatedQueryResult<Result, Error>

export function paginatedQuery<Result = unknown, Error = unknown> (
	queryKey: QueryKey,
	queryFn: QueryFunction<Result>,
	queryConfig?: PaginatedQueryConfig<Result, Error>
): UsePaginatedQueryResult<Result, Error>

// Object syntax
export function paginatedQuery<Result = unknown, Error = unknown> (
	config: UsePaginatedQueryObjectConfig<Result, Error>
): UsePaginatedQueryResult<Result, Error>

// Implementation
export function paginatedQuery<Result, Error> (
	...args: any[]
): UsePaginatedQueryResult<Result, Error> {
	let conf = getQueryArgs<Result, Error>(args)[1];
	let base = baseQuery({ ...conf, keepPreviousData: true });

	let { subscribe } = derived(base, ($result) => ({
		...$result,
		resolvedData: $result.data,
		latestData: $result.query.state.data === $result.data
			? $result.data
			: undefined,
	}));

	return { ...base, subscribe };
}


export interface UsePaginatedQueryResult<Result, Error>
extends Readable<PaginatedQueryResult<Result, Error>> {
	configure (newConfig: Partial<PaginatedQueryConfig<Result, Error>>): void,
	refetch (key: QueryKey): void,
}

export interface UsePaginatedQueryObjectConfig<Result, Error> {
	queryFn?: QueryFunction<Result>,
	config?: PaginatedQueryConfig<Result, Error>,
}
