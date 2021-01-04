# Labeled Tuple Elements

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
