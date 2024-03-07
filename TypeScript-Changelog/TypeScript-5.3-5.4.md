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
function createStreetLight<C extends string>(colors: C[], defaultColor?: NoInfer<C>) {
    // ...
}

createStreetLight(["red", "yellow", "green"], "blue");
//                                            ~~~~~~
// error!
// Argument of type '"blue"' is not assignable to parameter of type '"red" | "yellow" | "green" | undefined'.
```