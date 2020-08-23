import { readable } from 'svelte/store';
import { QueryObserver } from './core/queryObserver';
import type { QueryObserverConfig, QueryKey, QueryResultBase } from './core/types';
import { useDefaultedQueryConfig } from './utils';


export function baseQuery<Result, Error> (
	config: QueryObserverConfig<Result, Error> = {}
) {
	config = useDefaultedQueryConfig(config);

	let observer: QueryObserver<Result, Error> | null = null;

	let { subscribe } = readable({} as QueryResultBase<Result, Error>, (set) => {
		if (!observer) observer = new QueryObserver(config);
		set(observer.getCurrentResult());
		return observer.subscribe(set);
	});

	function configure (newConfig: Partial<any>) {
		config = useDefaultedQueryConfig({ ...config, ...newConfig });
		observer?.updateConfig(config);
	}

	function refetch (key: QueryKey) {
		configure({ queryKey: key });
	}

	return { subscribe, configure, refetch };
}
