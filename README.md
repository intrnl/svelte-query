# svelte-query

Svelte library for managing, caching and syncing asynchronous and remote data.

Uses `react-query` core.

## Motivation

See the [Overview](https://react-query.tanstack.com/docs/overview) section of
React Query for more details, essentially, it means dealing with these pain
points without writing a lot of code.

- Caching data and lazily loading them without mixing up with global state
- Deduping multiple of the same request
- Refetching data when it is "stale"
- Quickly propagating data across all its consumers
- Handling pagination and infinitely flowing data

## Installation

```sh
# npm
npm install @intrnl/svelte-query
# pnpm
pnpm install @intrnl/svelte-query
# yarn
yarn add @intrnl/svelte-query
```

## Example

```svelte
<script>
  import { query } from '@intrnl/svelte-query';

  async function fetchRepoData () {
    let resp = await fetch('https://api.github.com/repos/tannerlinsley/react-query');
    let json = await resp.json();

    return json;
  }

  let q = query('repoData', fetchRepoData);
</script>

{#if $q.status === 'loading'}
  <div>Loading</div>
{:else if $q.status === 'error'}
  <div>An error has occured!</div>
  <div>{$q.error.message}</div>
{:else}
  <h1>{$q.data.name}</h1>
  <p>{$q.data.description}</p>
  <div>
    <span>{$q.data.subscribers_count} watchers</span> |
    <span>{$q.data.stargazers_count} stars</span> |
    <span>{$q.data.forks_count} forks</span>
  </div>
{/if}
```
