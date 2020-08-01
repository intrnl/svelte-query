# Overview

React Query for Svelte **makes fetching, caching, synchronizing and updating
server state a breeze in your Svelte powered applications**.

## Motivation

Svelte does not come with an opinionated way of fetching or updating data from
your components, only a way to await promises, so data fetching tends to end up
being like this.

```svelte
<script>
  import { fetchData } from './fetchData';
</script>

{#await fetchData()}
  <!-- Show loading -->
{:then data}
  <!-- Show data -->
{:catch error}
  <!-- Show error -->
{/await}
```

You could cobble up a solution using general purpose state management libraries
like Redux to store and provide those data throughout your app, but these kinds
of solutions tends to miss out on the differences that async or server state
has, which is:

- Server state is persisted in a location you don't control or own
- Server state requires asynchronous APIs for it to be fetched or updated
- Server state implies shared ownership and can be changed by other people
  without your knowledge
- Server state stored locally can potentially become "out of date" if you're
  not careful

Once you grasp the nature of server state in your applications, you might
realize that traditional state management solutions are not so great at working
with async or server state, especially when it comes to the additional
challenges that it brings:

- Caching data and/or lazily loading them
- Deduping multiple requests for the same data
- Refetching data in the background when it is "stale"
- Propagating those data quickly to all consumers of that data
- Handling pagination and infinite scrolling
- Handling garbage collection of server state when it is unused

If you're not overwhelmed by that list, then you've probably solved all of your
server state problems already and deserves an award for it. However, for the
vast majority of people, you either have yet to tackle all or even most of
challenges.

React Query for Svelte is one of the best libraries for managing server state.
It works well out of the box without any config for most applications, and can
be customized to your liking as your application grows.

On a more technical note, it will likely:

- Help you remove many lines of complicated and misunderstood code from your
  application and replace it with just a handful of lines of query logic.
- Make your application more maintainable and easier to build new features
  without worrying about wiring up new server state data sources.
- Have a direct impact on your end users by making your application feel faster
  and more responsive than ever before.
- Potentially help you save on bandwidth and increase memory performance.

## Show me the code!

In the example below, you can see React Query for Svelte in its basic and
simple form being used to fetch the GitHub stats for its GitHub repository.

[Open in Svelte REPL](https://svelte.dev/repl/32932348da304353bd74785df1b7842f?version=3.24.0)

```svelte
<script>
  import { query } from '@intrnl/svelte-query';

  let q = query('repoData', () => (
    fetch('https://api.github.com/repos/intrnl/svelte-query')
      .then((res) => res.json())
  ));

  $: ({ status, error, data } = $q);
</script>

{#if status === 'loading'}
  <div>Loading...</div>
{:else if status === 'error'}
	<div>An error has occured: {error.message}</div>
{:else}
  <div>
    <h1>{data.name}</h1>
    <p>{data.description}</p>
    <div>
      <strong>👀 {data.subscribers_count}</strong> |
      <strong>✨ {data.stargazers_count}</strong> |
      <strong>🍴 {data.forks_count}</strong>
    </div>
  </div>
{/if}
```
