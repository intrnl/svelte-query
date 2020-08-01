# Displaying global fetching state

If you would like to show a global loading indicator for **all queries that are
currently fetching**, you can use the `isFetching` store, which contains the
amount of queries that are currently being fetched.

```svelte
<script>
  import { isFetching } from '@intrnl/svelte-query';
</script>

{#if $isFetching}
  <div>Queries are being fetched in the background</div>
{/if}
```
