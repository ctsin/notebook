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