# Query keys

Query caches are managed based on its keys, whether it's as simple as a string, or as complex as an array or objects of values. Anything can be used as long as it is serializable, and unique to the query's data.

## String keys

The simplest form of a key, this format is useful for:

- Generic list or index data
- Non-hierarchical data

```js
// A list of todos
query('todos', /* ... */)
```

## Array keys

When a query needs more information to uniquely describe its data, you can use
an array with a string, and then any number of serializable objects. This is
useful for:

- Specific resources
- Queries with additional parameters

```js
// An individual todo
query(['todo', 5])

// An individual todo, with additional options
query(['todo', 5, { preview: true }])

// A list of todos that are completed
query(['todos', { status: 'completed' }])
```

### Deterministic serializing of object keys

This means that all of these queries would be the same no matter the order
of the properties, this does not affect arrays however.

```js
query(['todos', { status, page }])

query(['todos', { page, status }])
```

## Query key as arguments

Query keys are passed to your query function as arguments in the order they are
defined in the array key.

```js
query(['todo', 5, { preview }], fetchTodo)

function fetchTodo (key, id, { preview }) {
  key // -> 'todo'
  id // -> 5
  preview // -> false
}
```
