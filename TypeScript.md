# Config TypeScript for NodeJS in 2023

https://www.youtube.com/watch?v=H91aqUHn8sE&t=2s

Install dependencies

```shell
yarn add -D typescript @types@node
```

Update `package.json`

```json
{
  "type": "module", 🚀
  "scripts": [
    "build": "tsc"
  ]
}
```

In `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
    "module": "NodeNext" /* Specify what module code is generated. */,
    "moduleResolution": "NodeNext" /* Specify how TypeScript looks up a file from a given module specifier. */,
    "outDir": "./dist" /* Specify an output folder for all emitted files. */,
  },
  "include": ["./src/**/*"]
}
```

With the `"moduleResolution": "NodeNext"` option, the `import` statement is required to specify extension explicitly.

```ts
// Relative import paths need explicit file extensions in EcmaScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './helper.js'?ts(2835)
import { helper } from "./helper"; 

// `.js`, not `.ts`! Even though the source is `helper.ts`
import { helper } from "./helper.js"; 
```

# Use `Context` with type safe

```js
interface User {
  name: string;
  age: number;
}

const userContext = createContext<User | null 🌟>(null)

const useUser = () => {
  const context = useContext(userContext);

  if (!context 🌟) {
    throw new Error('Context should be used within a provider.');
  }

  return context;
}
```

# Narrow `string` down to literals types

```ts
type Fruits = 'banana' | 'apple' | 'orange';
let apple = 'apple'

// error: typeof "fruits" = string;
// type "string" is not assignable to type Fruits
let fruits: Fruits = 'banana';

// Fix
fruits = <const>apple; // works outside of .tsx files
fruits: Fruits = <const> 'banana'; 
```

> **Bonum Tip** `<const> true` and `<const> false` to represent a boolean that must be `true` or `false`.

> Seen also: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-inference

> https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions

# Zod

 TypeScript-first schema validation with static type inference 

https://www.npmjs.com/package/zod

# Retrieve value from an Object type

```ts
type Fruit =
  | { name: 'apple'; color: 'red'; }
  | { name: 'banana'; color: 'yellow'; }
  | { name: 'orange'; color: 'orange'; }


type FruitName = Fruit["name"];
type TransformedFruit = {
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types
  [F in Fruit as F['name']]: `${F['name']}:${F['color']}`;
}[FruitName]

type Expected = 'apple:red' | 'banana:yellow' | 'orange:orange';
```

# `extends` in 4 scenarios

```ts
// Class
class Dog extends Animal {}

// Interface
interface Dog extends Animal {}

// Generic
type Dog<T extends {domesticated: boolean}> = T & Animal;

// Conditional Types
type Dog<T> = T extends {legs: number} ? Animal : never;
```

# Indexed access types

```ts
interface ColorType {
  primary: 'red';
  secondary: 'blue';
  tertiary: 'green';
}

// type ColorValue = "red" | "blue" | "green"
type ColorValue = ColorType[keyof ColorType]

const color = ['red', 'blue', 'green'] as const;
// type Color = "red" | "blue" | "green"
// https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
type Color = typeof color[number]

interface UserRoleConfig {
  user: ['read', 'update'];
  superuser: ['read', 'create', 'update', 'remove']
}

// type Actions = "read" | "update" | "create" | "remove"
type Actions = UserRoleConfig[keyof UserRoleConfig][number]
```

# Deriving types from an array of object

```ts
const duration = [
  {
    label: "Foo",
    value: 1,
  },
  {
    label: "Bar",
    value: 3,
  },
] as const;

// 1 | 3
type DurationValue = typeof duration[number]["value"]
```
# Use TypeScript's `never` to enforce "one or the other" properties on a type

```ts
type Base = {
  name: string;
}

interface Free extends Base {
  url: string;
  price?: never;
}

interface Paid extends Base {
  url?: never;
  price: number;
}

type Course = Free | Paid;

// Type 'string' is not assignable to type 'undefined'.
const course: Course = {
  name: 'Hello World',
  price: 5,
  url: "",
}
```

# Object literal may only specify known properties

https://stackoverflow.com/questions/61698807/interesting-behaviour-object-literal-may-only-specify-known-properties

There're similar questions here and I can understand the nature of this error:
```ts
type Person = { name: string };

// Error: Object literal may only specify known properties, and 'age' does not exist in type 'Person'.
const person: Person = { name: 'Sarah', age: 13 };
```

So this fails, because property age is not a part of type Person which makes sense.

However, I can do this without any problems:

```ts
type Person = { name: string };

const obj = { name: 'Sarah', age: 13 };
const person: Person = obj;

console.log(person); // { name: 'Sarah', age: 13 }
```

Why the first one is failing and the second is not - shouldn't these 2 examples both fail or both pass?

As for me these 2 code snippets are identical. Aren't they?

Here's an explanation of this behavior from [Typescript Handbook](https://www.typescriptlang.org/docs/handbook/interfaces.html#excess-property-checks):

> Object literals get special treatment and undergo excess property checking when assigning them to other variables, or passing them as arguments. If an object literal has any properties that the “target type” doesn’t have, you’ll get an error.

**TLDR**: when initializing with a literal the TSC is strict