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

## Example 3: Generic Class with Constraints

We can also create generic classes. A powerful feature to use with generic classes (and functions) is **constraints**. Constraints allow us to limit the kinds of types that can be used as a type argument.

In `src/base-repository.ts`, we define a generic `InMemoryRepository<T>` that can work with any entity type, as long as that entity has an `id` property.

First, we define a generic `Repository` interface:

```typescript
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(item: T): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}
```

Then, we implement this with a generic class that uses a constraint.

```typescript
class InMemoryRepository<T extends { id: string }> implements Repository<T> {
  private store: Map<string, T> = new Map();

  // ... implementation ...

  async create(item: T): Promise<T> {
    // We can safely access item.id because of the constraint
    this.store.set(item.id, item);
    return item;
  }

  // ... other methods
}
```

The key part is `<T extends { id:string }>`. This tells TypeScript that `T` can be any type, as long as it has a property `id` of type `string`. This allows us to safely use `item.id` inside our class methods.

### Usage

We can now create repositories for different entities that match the constraint.

```typescript
// Entities that satisfy the constraint { id: string }
type User = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
};

const userRepository = new InMemoryRepository<User>();
const productRepository = new InMemoryRepository<Product>();
```

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

    # Run the generic class example
    bun src/base-repository.ts
    ```

This will execute the `main` functions in each file and log the results to the console.
