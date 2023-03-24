# 3.7

# Assertion Functions

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions

There’s a specific set of functions that throw an error if something unexpected happened. They’re called “assertion” functions.

# 2.8

# Type inference in conditional types

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types

Multiple candidates for the same type variable in co-variant positions causes a union type to be inferred:

```ts
type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;
type T10 = Foo<{ a: string; b: string }>; // string
type T11 = Foo<{ a: string; b: number }>; // string | number
```

and:

```ts
type Bar<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void }
  ? U
  : never;
type T20 = Bar<{ a: (x: string) => void; b: (x: string) => void }>; // string
type T21 = Bar<{ a: (x: string) => void; b: (x: number) => void }>; // string & number
```

It is not possible to use infer declarations in constraint clauses for regular type parameters:

```ts
// Error, not supported
type ReturnType<T extends (...args: any[]) => infer R> = R; 
```

# Improved Inference for `infer` Types in Template String Types

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-8.html#improved-inference-for-infer-types-in-template-string-types

