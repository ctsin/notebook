# Template Literal Types

❗️ `in` operator in Enums

```ts
type Options = {
  [K in "noImplicitAny" | "strictNullChecks" | "strictFunctionTypes"]?: boolean;
};
// same as
//   type Options = {
//       noImplicitAny?: boolean,
//       strictNullChecks?: boolean,
//       strictFunctionTypes?: boolean
//   };
```

Typically usage.

```ts
type World = "world";

type Greeting = `hello ${World}`;
//   ^ = type Greeting = "hello world"
```

Uses with Union Types

```ts
type Color = "red" | "blue";
type Quantity = "one" | "two";

type SeussFish = `${Quantity | Color} fish`;
//   ^ = type SeussFish = "one fish" | "two fish" | "red fish" | "blue fish"
```

Connect with each Enums

```ts
type VerticalAlignment = "top" | "middle" | "bottom";
type HorizontalAlignment = "left" | "center" | "right";

// Takes
//   | "top-left"    | "top-center"    | "top-right"
//   | "middle-left" | "middle-center" | "middle-right"
//   | "bottom-left" | "bottom-center" | "bottom-right"

declare function setAlignment(value: `${VerticalAlignment}-${HorizontalAlignment}`): void;

setAlignment("top-left");   // works!
setAlignment("top-middel"); // error!
```

Produce mostly identical types

```ts
type PropEventSource<T> = {
    on(eventName: `${string & keyof T}Changed`, callback: () => void): void;
    //                  1️⃣       2️⃣
    // 1️⃣ Narrow props key type `string | number | symbol` down to `string`.
    // 2️⃣ keyof is used on object
};

declare function makeWatchedObject<T>(obj: T): T & PropEventSource<T>;
```
# Key Remapping in Mapped Types

```ts
type Getters<T> = {
    //                        👇 1️⃣
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
    //            👆 as clause
};

interface Person {
    name: string;
    age: number;
    location: string;
}

type LazyPerson = Getters<Person>;
//   ^ = type LazyPerson = {
//       getName: () => string;
//       getAge: () => number;
//       getLocation: () => string;
//   }
```

> 1️⃣ The new type aliases are Uppercase, Lowercase, Capitalize and Uncapitalize. The first two transform every character in a string, and the latter two transform only the first character in a string.

And you can even filter out keys by producing `never`. That means you don’t have to use an extra Omit helper type in some cases.

```ts
// Remove the 'kind' property
type RemoveKindField<T> = {
    [K in keyof T as Exclude<K, "kind">]: T[K]
};

interface Circle {
    kind: "circle";
    radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;
//   ^ = type KindlessCircle = {
//       radius: number;
//   }
```

