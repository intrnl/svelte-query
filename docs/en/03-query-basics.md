# Query Basics

A query is a declarative dependency on an asynchronous source of data.

To make a new query, call `query` function with:
- A unique key for the query, this is used interally for refetching, caching
  and deduping related queries
- An asynchronous function (or thenable) that returns the data

```svelte
<script>
  import { query } from '@intrnl/svelte-query';

  let q = query('todos', fetchTodosList);
</script>
```

The `query` function will return a store piece that can be subscribed in your
component in order to retrieve the query info object.

```svelte
<script>
  let q = query('todos', fetchTodosList);
</script>

{#if $q.status === 'loading'}
  <span>Loading...</span>
{:else if $q.status === 'error'}
  <span>Error: {$q.error.message}</span>
{:else}
  <ul>
    {#each $q.data as item (item.id)}
      <li>{item.title}</li>
    {/each}
  </ul>
{/if}
```

You can use destructuring with reactive statements if you prefer.

```svelte
<script>
  let q = query('todos', fetchTodosList);
  $: ({ status, data, error } = $q);
</script>

{#if status === 'loading'}
  <span>Loading...</span>
{/if}
```

The query info object also provides `isLoading`, `isError` and `isSuccess` if
you prefer working with boolean values.

```svelte
<script>
  let q = query('todos', fetchTodosList);
  $: ({ isLoading } = $q);
</script>

{#if isLoading}
  <span>Loading...</span>
{/if}
```

Using `isLoading` or `status === 'loading'` should be sufficient to show the
initial loading state for a query, but you could also use `isFetching` to show
an indication that the query is being refetched in the background.

```svelte
<script>
  let q = query('todos', fetchTodosList);
  $: ({ status, data, error, isFetching } = $q);
</script>

{#if status === 'loading'}
  <!-- Loading... -->
{:else if status === 'error'}
  <!-- Error! -->
{:else}
  {#if isFetching}
    <div>Refreshing...</div>
  {/if}

  <div>
    {#each data as item (item.id)}
      <Todo {...item} />
    {/each}
  </div>
{/if}
```
