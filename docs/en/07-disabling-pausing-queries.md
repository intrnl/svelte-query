# Disabling or pausing queries

If you want to disable a query from automatically running, you can use the
`enabled` option, which does the following.

- The query will not fetch results on mount, refetch in background when it
  is stale, or be affected by other query instances of the same key.
- If the query doesn't have cached data, it will indicate that it's idle.
- If the query has cached data, it will continue to indicate the success status

You can turn it back on by using the `configure` function.

```svelte
<script>
  let q = query('todos', fetchTodosList, { enabled: false });
  $: ({ status, data, error } = $q);

  function enableQuery () {
    q.configure({ enabled: true });
  }
</script>

{#if status === 'idle'}
  <div>Not ready yet.</div>
{/if}
```
