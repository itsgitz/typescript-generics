# TypeScript Generics

This repository provides simple examples to demonstrate the use of generic types in TypeScript.

## What are Generics?

Generics allow you to create reusable components that can work with a variety of types rather than a single one. This enhances flexibility and type safety.

## Example 1: Generic Type

A common use case for generics is to create a wrapper for API responses. The structure of the response is often the same (e.g., it has a `data` field, a `success` flag, and an optional `error` message), but the type of the `data` can vary.

In `src/api-response.ts`, we define a generic `ApiResponse<T>` type:

```typescript
type ApiResponse<T> = {
  data: T;
  success: boolean;
  error?: string;
};
```

The `T` is a placeholder for a type that will be provided when we use `ApiResponse`.

### Usage

We can then use this generic type for different kinds of data.

#### Response with a User object

```typescript
type User = { id: string; name: string };

const userResponse: ApiResponse<User> = {
  data: {
    id: "1",
    name: "Putri",
  },
  success: true,
};
```

Here, `T` is replaced with `User`.

#### Response with a string

```typescript
const stringResponse: ApiResponse<string> = {
  data: "Hello world!",
  success: true,
};
```

Here, `T` is replaced with `string`.

## Example 2: Generic Function

Generics are also incredibly useful for functions. You can create a function that operates on or returns a value whose type is not known ahead of time.

In `src/api-client.ts`, we define a generic `fetchJSON<T>` function to fetch and parse data from a URL:

```typescript
async function fetchJSON<T>(url: string): Promise<T> {
  const res = await axios.get(url);
  if (!res.status.toString().startsWith("2")) {
    throw new Error(res.statusText);
  }
  return res.data;
}
```

Here, `T` represents the expected type of the data in the response body. The function promises to return a value of that type.

### Usage

We can use this function to fetch different types of data by specifying the type when we call it.

```typescript
type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

// We expect an array of Todo objects
const todos = await fetchJSON<Todo[]>(
  "https://jsonplaceholder.typicode.com/todos"
);
```

In this case, we tell `fetchJSON` that `T` should be `Todo[]`, and TypeScript will ensure that the `todos` constant is correctly typed as an array of `Todo` objects.

## How to Run

1.  Install dependencies:
    ```bash
    bun install
    ```
2.  Run the examples:
    ```bash
    # Run the generic type example
    bun src/api-response.ts

    # Run the generic function example
    bun src/api-client.ts
    ```

This will execute the `main` functions in each file and log the results to the console.
