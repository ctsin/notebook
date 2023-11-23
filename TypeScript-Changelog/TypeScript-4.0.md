# Labeled Tuple Elements

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#labeled-tuple-elements

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-2.html#leadingmiddle-rest-elements-in-tuple-types

```ts
type Foo = [first: number, second?: string, ...rest: any[]];
```

> Tuple members must all have names or all not have names.

# Short-Circuiting Assignment Operators

`&&=`, `||=` and `??=`

Similar to the code following.

```ts
a = a && b;
a = a || b;
a = a ?? b;
```

Initialize value pattern to seen.

```ts
let values: string[];

// Before
(values ?? (values = [])).push('Hello')

// After
(values ??= []).push('Hello')

```
