# Refetching on window focus

React Query will automatically refetch queries in the background when the tab
or window gets refocused. You can disable this globally, by using a config
provider and `refetchOnWindowFocus` option.

```svelte
<!-- App.svelte -->
<script>
  import { QueryConfigProvider } from '@intrnl/svelte-query';

  let queryConfig = {
    queries: {
      refetchOnWindowFocus: false,
    },
  };
</script>

<QueryConfigProvider config={queryConfig}>
  <!-- ... -->
</QueryConfigProvider>
```

You can also do it per individual queries, as such.

```svelte
<script>
  import { query } from '@intrnl/svelte-query';

  let q = query(['todo', 5], fetchTodo, {
    refetchOnWindowFocus: false,
  });
</script>
```

## Custom Window focus event

In certain situations, you may want to manage how the window focus events are
triggered for refetching. To do this, you can use the `setFocusHandler` that
supplies you the callback that should be fired when the window is focused and
also allows you to set up your own events.

```js
import { setFocusHandler } from '@intrnl/svelte-query';

setFocusHandler((handleFocus) => {
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('visibilitychange', handleFocus, false);
    window.addEventListener('focus', handleFocus, false);

    // Be sure to unsubscribe the event listeners.
    return () => {
      window.removeEventListener('visibilitychange', handleFocus);
      window.removeEventListener('focus', handleFocus);
    };
  }
});
```
