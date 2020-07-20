import { SvelteComponent } from 'svelte';
import { Readable } from 'svelte/store';


export let QueryCacheProvider: SvelteComponent;
export let QueryConfigProvider: SvelteComponent;


// Query
export function query<TResult, TKey extends AnyQueryKey, TError = Error> ({
  queryKey, queryFn, config
}: {
  queryKey: TKey,
  queryFn?: QueryFunction<TResult, TKey>,
  config?: QueryOptions<TResult, TError>,
}): Readable<QueryResult<TResult, TError>>

export function query<TResult, TKey extends string, TError = Error> ({
  queryKey, queryFn, config
}: {
  queryKey: TKey,
  queryFn?: QueryFunction<TResult, [TKey]>,
  config?: QueryOptions<TResult, TError>,
}): Readable<QueryResult<TResult, TError>>

export function query<TResult, TKey extends AnyQueryKey, TError = Error> (
  queryKey: QueryKey<TKey>,
  ...rest: QueryRest<TResult, TKey, TError>
): Readable<QueryResult<TResult, TError>>

export function query<TResult, TKey extends string, TError = Error> (
  queryKey: QueryKey<TKey>,
  ...rest: QueryRest<TResult, [TKey], TError>
): Readable<QueryResult<TResult, TError>>


export type QueryRest<TResult, TKey extends AnyQueryKey, TError> =
  | []
  | [QueryFunction<TResult, TKey>]
  | [QueryFunction<TResult, TKey>, QueryOptions<TResult, TError> | undefined]
  | [QueryOptions<TResult, TError>];

// Infinite query
export function infiniteQuery<
  TResult, TKey extends AnyQueryKey, TMoreVariable, TError = Error,
> (options: {
  queryKey: QueryKey<TKey>,
  queryFn?: InfiniteQueryFunction<TResult, TKey, TMoreVariable>,
  config?: InfiniteQueryOptions<TResult, TMoreVariable, TError>,
}): Readable<InfiniteQueryResult<TResult, TMoreVariable, TError>>

export function infiniteQuery<
  TResult, TKey extends string, TMoreVariable, TError = Error,
> (options: {
  queryKey: QueryKey<TKey>,
  queryFn?: InfiniteQueryFunction<TResult, [TKey], TMoreVariable>,
  config?: InfiniteQueryOptions<TResult, TMoreVariable, TError>,
}): Readable<InfiniteQueryResult<TResult, TMoreVariable, TError>>

export function infiniteQuery<
  TResult, TKey extends AnyQueryKey, TMoreVariable, TError = Error,
> (
  queryKey: QueryKey<TKey>,
  queryFn: InfiniteQueryFunction<TResult, TKey, TMoreVariable>,
  config?: InfiniteQueryOptions<TResult, TMoreVariable, TError>,
): Readable<InfiniteQueryResult<TResult, TMoreVariable, TError>>

export function infiniteQuery<
  TResult, TKey extends string, TMoreVariable, TError = Error,
> (
  queryKey: QueryKey<TKey>,
  queryFn: InfiniteQueryFunction<TResult, [TKey], TMoreVariable>,
  config?: InfiniteQueryOptions<TResult, TMoreVariable, TError>
): Readable<InfiniteQueryResult<TResult, TMoreVariable, TError>>

// Paginated query
export type PaginatedQueryFn =
  | (<TResult, TKey extends AnyQueryKey, TError = Error>
      ({ queryKey, queryFn, config }: {
        queryKey: QueryKey<TKey>,
        queryFn: QueryFunction<TResult, TKey>,
        config?: QueryOptions<TResult, TError>,
      }) => Readable<PaginatedQueryResult<TResult, TError>>
    )
  | (<TResult, TKey extends string, TError = Error>
      ({ queryKey, queryFn, config }: {
        queryKey: QueryKey<TKey>,
        queryFn: QueryFunction<TResult, [TKey]>,
        config?: QueryOptions<TResult, TError>,
      }) => Readable<PaginatedQueryResult<TResult, TError>>
    )
  | (<TResult, TKey extends AnyQueryKey, TError = Error>
      (
        queryKey: QueryKey<TKey>,
        queryFn: QueryFunction<TResult, TKey>,
        config?: QueryOptions<TResult, TError>,
      ) => Readable<PaginatedQueryResult<TResult, TError>>
    )
  | (<TResult, TKey extends string, TError = Error> 
      (
        queryKey: QueryKey<TKey>,
        queryFn: QueryFunction<TResult, [TKey]>,
        config?: QueryOptions<TResult, TError>,
      ) => Readable<PaginatedQueryResult<TResult, TError>>
    );

export function createPaginatedQuery (): PaginatedQueryFn

// Query state
export type QueryStatus = 'idle' | 'loading' | 'error' | 'success';

// Query result
export type QueryResult<TResult, TError = Error> =
  | QueryIdleResult<TResult, TError>
  | QueryLoadingResult<TResult, TError>
  | QueryErrorResult<TResult, TError>
  | QuerySuccessResult<TResult, TError>;

export type PaginatedQueryResult<TResult, TError = Error> =
  | PaginatedQueryIdleResult<TResult, TError>
  | PaginatedQueryLoadingResult<TResult, TError>
  | PaginatedQueryErrorResult<TResult, TError>
  | PaginatedQuerySuccessResult<TResult, TError>;

export interface InfiniteQueryResult<TResult, TMoreVariable, TError = Error>
  extends QueryResultBase<TResult[], TError> {
    data: TResult[] | undefined,
    isFetchingMore: false | 'previous' | 'next',
    canFetchMore: boolean | undefined,
    fetchMore (
      moreVariable?: TMoreVariable | false,
      options?: { previous?: boolean }
    ): Promise<TResult[]> | undefined,
}

export interface QueryIdleResult<TResult, TError = Error>
  extends QueryResultBase<TResult, TError> {
    status: 'idle',
    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: undefined,
    error: null,
}

export interface QueryLoadingResult<TResult, TError = Error>
  extends QueryResultBase<TResult, TError> {
    status: 'loading',
    isIdle: false,
    isLoading: true,
    isError: false,
    isSuccess: false,
    data: TResult | undefined,
    error: TError | null,
}

export interface QueryErrorResult<TResult, TError = Error>
  extends QueryResultBase<TResult, TError> {
    status: 'error',
    isIdle: false,
    isLoading: false,
    isError: true,
    isSuccess: false,
    data: TResult | undefined,
    error: TError,
}

export interface QuerySuccessResult<TResult, TError = Error>
  extends QueryResultBase<TResult, TError> {
    status: 'success',
    isIdle: false,
    isLoading: false,
    isError: false,
    isSuccess: true,
    data: TResult,
    error: null,
}

export interface PaginatedQueryIdleResult<TResult, TError = Error>
  extends QueryResultBase<TResult, TError> {
    status: 'idle',
    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,
    resolvedData: undefined,
    latestData: undefined,
    error: null,
}

export interface PaginatedQueryLoadingResult<TResult, TError = Error>
  extends QueryResultBase<TResult, TError> {
    status: 'loading',
    isIdle: false,
    isLoading: true,
    isError: false,
    isSuccess: false,
    resolvedData: TResult | undefined,
    latestData: TResult | undefined,
    error: TError | null,
}

export interface PaginatedQueryErrorResult<TResult, TError = Error>
  extends QueryResultBase<TResult, TError> {
    status: 'error',
    isIdle: false,
    isLoading: false,
    isError: true,
    isSuccess: false,
    resolvedData: TResult | undefined,
    latestData: TResult | undefined,
    error: TError,
}

export interface PaginatedQuerySuccessResult<TResult, TError = Error>
  extends QueryResultBase<TResult, TError> {
    status: 'success',
    isIdle: false,
    isLoading: false,
    isError: false,
    isSuccess: true,
    resolvedData: TResult,
    latestData: TResult,
    error: null,
}

export interface QueryResultBase<TResult, TError = Error> {
  status: QueryStatus,
  error: TError | null,
  isIdle: boolean,
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
  isFetching: boolean,
  isStale: boolean,
  failureCount: number,
  canFetchMore?: boolean,
  markedForGarbageCollection: boolean,
  query: object,
  updatedAt: number,
  refetch (options?: { throwOnError?: boolean }): Promise<TResult>,
  clear (): void,
}

// Query function
export type QueryFunction<TResult, TKey extends AnyQueryKey> =
  (...key: Readonly<TKey>) => Promise<TResult>;

export type InfiniteQueryFunction<
  TResult,
  TKey extends AnyQueryKey,
  TMoreVariable,
> = (...keysAndMore: TKey | [...TKey, TMoreVariable]) => Promise<TResult>;

// Query key
export type AnyQueryKey = readonly [DefinedQueryKeyPart, ...QueryKeyPart[]];
export type QueryKey<TKey> = TKey | false | null | undefined;

export type QueryKeyOrPredicate = 
  | AnyQueryKey
  | string
  | boolean
  | ((query: CachedQuery<unknown>) => boolean);

export type DefinedQueryKeyPart =
  | string
  | number
  | boolean
  | object
  | readonly QueryKeyPart[];

export type QueryKeyPart =
  | string
  | number
  | boolean
  | object
  | readonly QueryKeyPart[]
  | null
  | undefined;

// Query cache
export interface CachedQueryState<T, TError = Error> {
  data: T | undefined,
  error: TError | null | undefined,
  failureCount: number,
  status: 'loading' | 'error' | 'success',
  isFetching: boolean,
  isStale: boolean,
  canFetchMore?: boolean,
  updatedAt: number,
}

export interface CachedQuery<T, TError = unknown> {
  queryKey: AnyQueryKey,
  queryFn: (...args: any[]) => unknown,
  config: QueryOptions<unknown, TError>,
  state: CachedQueryState<T, TError>,
  setData (
    data:
      | unknown
      | undefined
      | ((oldData: unknown | undefined) => unknown | undefined)
  ): void,
  clear (): void,
}

// Query options
export interface BaseQueryOptions<TResult = unknown, TError = Error> {
  enabled?: boolean,
  retry?: boolean | number | ((failureCount: number, error: TError) => boolean),
  retryDelay?: (retryAttempt: number) => number,
  staleTime?: number,
  cacheTime?: number,
  refetchInterval?: false | number,
  refetchIntervalInBackground?: boolean,
  refetchOnWindowFocus?: boolean,
  refetchOnMount?: boolean,
  onSuccess?: (data: TResult) => void,
  onError?: (data: TError) => void,
  onSettled?: (data: TResult | undefined, error: TError | null) => void,
  isDataEqual?: (oldData: unknown, newData: unknown) => boolean,
  queryFnParamsFilter?: (args: any[]) => any[],
}

export interface QueryOptions<TResult, TError = Error>
  extends BaseQueryOptions<TResult, TError> {
    initialData?: TResult | (() => TResult | undefined),
    initialStale?: boolean | (() => boolean | undefined),
}

export interface InfiniteQueryOptions<TResult, TMoreVariable, TError = Error>
  extends QueryOptions<TResult[], TError> {
    getFetchMore (lastPage: TResult, allPages: TResult[]): TMoreVariable,
}

export interface SetQueryDataQueryOptions<TResult, TError = Error>
  extends QueryOptions<TResult, TError> {
    exact?: boolean,
}

export interface PrefetchQueryOptions {
  force?: boolean,
  throwOnError?: boolean,
}


// isFetching
export let isFetching: Readable<number>;

// Query cache
export function getQueryCache (): QueryCache

export function makeQueryCache (options?: MakeQueryCacheOptions): QueryCache

export let queryCache: QueryCache;
export let queryCaches: QueryCache[];

export interface QueryCache {
  prefetchQuery<TResult, TKey extends AnyQueryKey, TError = Error> (
    queryKey: QueryKey<TKey>,
    queryFn: QueryFunction<TResult, TKey>,
    config?: QueryOptions<TResult, TError>,
    prefetch?: PrefetchQueryOptions,
  ): Promise<TResult>,
  prefetchQuery<TResult, TKey extends string, TError = Error> (
    queryKey: QueryKey<TKey>,
    queryFn: QueryFunction<TResult, [TKey]>,
    config?: QueryOptions<TResult, TError>,
    prefetch?: PrefetchQueryOptions,
  ): Promise<TResult>,

  prefetchQuery<TResult, TKey extends AnyQueryKey, TError = Error> (
    queryKey: QueryKey<TKey>,
    queryFn: QueryFunction<TResult, TKey>,
    prefetch?: PrefetchQueryOptions,
    config?: QueryOptions<TResult, TError>,
  ): Promise<TResult>,
  prefetchQuery<TResult, TKey extends string, TError = Error> (
    queryKey: QueryKey<TKey>,
    queryFn: QueryFunction<TResult, [TKey]>,
    prefetch?: PrefetchQueryOptions,
    config?: QueryOptions<TResult, TError>,
  ): Promise<TResult>,

  prefetchQuery<TResult, TKey extends AnyQueryKey, TError = Error> ({
    queryKey, queryFn, config, prefetch,
  }: {
    queryKey: QueryKey<TKey>,
    queryFn: QueryFunction<TResult, TKey>,
    config?: QueryOptions<TResult, TError>,
    prefetch?: PrefetchQueryOptions,
  }): Promise<TResult>,
  prefetchQuery<TResult, TKey extends string, TError = Error> ({
    queryKey, queryFn, config, prefetch,
  }: {
    queryKey: QueryKey<TKey>,
    queryFn: QueryFunction<TResult, [TKey]>,
    config?: QueryOptions<TResult, TError>,
    prefetch?: PrefetchQueryOptions,
  }): Promise<TResult>,

  getQueryData<T = unknown> (key: QueryKeyOrPredicate): T | undefined,
  setQueryData<TResult, TError = Error> (
    key: QueryKeyOrPredicate,
    data: 
      | TResult
      | ((oldData: TResult | undefined) => TResult | undefined)
      | undefined,
    config?: SetQueryDataQueryOptions<TResult, TError>,
  ): void,

  invalidateQueries<TResult> (
    key: QueryKeyOrPredicate,
    options?: QueryInvalidationOptions
  ): Promise<TResult>,

  removeQueries (
    key: QueryKeyOrPredicate,
    options?: QueryOperationOptions
  ): void,

  getQuery (key: QueryKeyOrPredicate): CachedQuery<unknown> | undefined,

  getQueries (
    key: QueryKeyOrPredicate,
    options?: QueryOperationOptions,
  ): CachedQuery<unknown>[],

  cancelQueries (
    key: QueryKeyOrPredicate,
    options?: QueryOperationOptions,
  ): void,

  isFetching: number,
  
  subscribe (
    callback: (cache: QueryCache, query?: CachedQuery<unknown>) => void
  ): () => void,

  clear (options?: { notify?: boolean }): void,
}

export interface QueryOperationOptions {
  exact?: boolean,
}

export interface QueryInvalidationOptions {
  exact?: boolean,
  throwOnError?: boolean,
  refetchActive?: boolean,
  refetchInactive?: boolean,
}

export interface MakeQueryCacheOptions {
  frozen?: boolean,
  defaultConfig?: BaseQueryOptions,
}

// Exported core utils
export function setConsole (console: ConsoleObject): void

export function deepIncludes (haystack: unknown, needle: unknown): boolean

export type ConsoleFunction = (...args: any[]) => void;
export interface ConsoleObject {
  log: ConsoleFunction,
  warn: ConsoleFunction,
  error: ConsoleFunction,
}
