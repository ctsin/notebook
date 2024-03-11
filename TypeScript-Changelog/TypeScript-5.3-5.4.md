https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-3.html

# Import Attributes

```ts
import obj from "./something.json" with { type: "json" };
```

Dynamic import() calls can also use import attributes through a second argument.

```ts
const obj = await import("./something.json", {
    with: { type: "json" }
});
```

https://devblogs.microsoft.com/typescript/announcing-typescript-5-4/

# The `NoInfer` Utility Type

```ts
function createStreetLight<C extends string>(colors: C[], defaultColor?: C) {
    // ...
}

// TypeScript infers the type of C as "red" | "yellow" | "green" | "blue".
// function createStreetLight<"red" | "yellow" | "green" | "blue">(colors: ("red" | "yellow" | "green" | "blue")[], defaultColor?: "red" | "yellow" | "green" | "blue" | undefined): void
createStreetLight(["red", "yellow", "green"], "blue");
```

TypeScript 5.4 introduces a new `NoInfer<T>` utility type. Surrounding a type in `NoInfer<...>` gives a signal to TypeScript not to dig in and match against the inner types to find candidates for type inference.

Excluding the type of `defaultColor` from being explored for inference means that "blue" never ends up as an inference candidate, and the type-checker can reject it.

```ts
function createStreetLight<C extends string>(colors: C[], defaultColor?: NoInfer<C>) {
    // ...
}

createStreetLight(["red", "yellow", "green"], "blue");
//                                            ~~~~~~
// error!
// Argument of type '"blue"' is not assignable to parameter of type '"red" | "yellow" | "green" | undefined'.
```