# Paginated queries

Rendering paginated data is a common UI pattern to avoid overloading bandwidth
or even your UI. The `paginatedQuery` function is available to help with that
scenario:

- Instead of `data`, you should use `resolvedData` which gives you the last
  successful data as the new page is being fetched.
- If you feel the need to get the data for the page currently being fetched,
  you can use `latestData`, which will show `undefined` while the query is
  still being fetched.

```svelte
<script>
  function fetcher (key, page = 1) {
    let resp = await fetch(`/api/projects?page=${page}`);

    if (!resp.ok) throw new Error(`HTTP error: ${resp.status}`);
    return await resp.json();
  }

  let page = 1;
  let q = paginatedQuery(['projects', page], fetcher);
  $: ({ status, resolvedData, error, isFetching } = $q);

  // Since this is a reactive statement, it will be called every time the page
  // variable changes.
  $: q.refetch(['projects', page]);
</script>

{#if status === 'loading'}
  <!-- Show loading indicator -->
{:else if status === 'error'}
  <!-- Show error indicator -->
{:else}
  {#if isFetching}
    <!-- Show indicator of the next page being loaded -->
  {/if}

  <ul>
    {#each resolvedData.projects as item (item.id)}
      <li>{item.name}</li>
    {/each}
  </ul>

  <p>Current page: {page + 1}</p>

  <!--
    For this example, we're going to assume that the data has a boolean that
    indicates there is more that can be fetched.
  -->

  <button disabled={page === 1} on:click={() => page -= 1}>
    Previous page
  </button>
  <button disabled={!latestData.hasMore} on:click={() => page += 1}>
    Next page
  </button>
{/if}
```
