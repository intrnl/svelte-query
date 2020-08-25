# Important Defaults

Out of the box, this library is configured with aggressive but sane defaults.
Sometimes these defaults can catch you off guard as a new user, or make learning
or debugging difficult if they aren't known. Keep this in mind as you continue
to learn and use this library.

- Query results that are currently used (rendered on screen) will become
  "stale" immediately after being fetched, and will be refetched in the background
  when they are rendered or used again. This is affected by the `staleTime`
  option (in miliseconds)
- Unused query results will be kept for 5 minutes before they are garbage
  collected. This is affected by the `cacheTime` option (in miliseconds)
- Stale query results will be refetched in the background when the browser
  window is refocused by the user. This is affected by `refetchOnWindowFocus`
  option.
- Failed queries will be retried 3 times with exponential backoff delay before
  being captured and thrown. This is affected by the `retry` option and
  `retryDelay` function.
- Query results will share structural identity with its previous results, which
  only works with JSON-compatible values and might cause performance issues with
  very large data. This is affected by `structuralSharing` option and
  `isDataEqual` function.
