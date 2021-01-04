💡 **How to guard Promise**

```ts
declare const values: Promise<Animals>
```
# Improvements in Inference and Promise.all

```ts
interface Lion {
  roar(): void;
}

interface Seal {
  singKissFromARose(): void;
}

async function visitZoo(
  lionExhibit: Promise<Lion>,
  sealExhibit: Promise<Seal | undefined>
) {
  let [lion, seal] = await Promise.all([lionExhibit, sealExhibit]);
  lion.roar(); // uh oh
  //  ~~~~
  // Object is possibly 'undefined'.
  // 
  // `seal` can be undefined, but not lion
  // This issue has been fixed in v3.9. You are encouraged to give v3.9 a shot
}
```

# Type-Only Imports and Export

TypeScript 3.8 adds a new syntax for type-only imports and exports.

```ts
import type { SomeThing } from "./some-module.js";

export type { SomeThing };
```