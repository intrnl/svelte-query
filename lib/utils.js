import { getQueryArgs, noop } from './core/utils.js';
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

export function readable (init, start) {
  function subscribe (listener) {
    let running = true;
    let prev = init;
    let stop;

    function set (curr) {
      if (running && curr !== prev) {
        prev = curr;
        if (stop) listener(curr);
      }
    }

    stop = start(set) || noop
    listener(prev);

    return function unsubscribe () {
      running = false;
      stop();
    }
  }

  return { subscribe };
}

export function derived (store, fn, init) {
  return readable(init, (set) => {
    return store.subscribe((value) => {
      set(fn(value));
    });
  });
}
