# TypeScript Generics

This repository provides a simple example to demonstrate the use of generic types in TypeScript.

## What are Generics?

Generics allow you to create reusable components that can work with a variety of types rather than a single one. This enhances flexibility and type safety.

## Example: Generic API Response

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

## How to Run

1.  Install dependencies:
    ```bash
    bun install
    ```
2.  Run the example:
    ```bash
    bun src/api-response.ts
    ```

This will execute the `main` function in `src/api-response.ts` and log the example responses to the console.
