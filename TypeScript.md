# Narrow `string` down to literals types

```ts
type Fruits = 'banana' | 'apple' | 'orange';
let apple = 'apple'

// error: typeof "fruits" = string;
// type "string" is not assignable to type Fruits
let fruits: Fruits = 'banana';

// Fix
fruits = <const>apple; 
fruits: Fruits = <const> 'banana'; 
```

> **Bonum Tip** `<const> true` and `<const> false` to represent a boolean that must be `true` or `false`.

# TypeScript tips and Tricks with Matt

https://www.youtube.com/watch?v=hBk4nV7q6-w&list=PLed0-rd1pwrdEcPWmwG50Pt_FLiEtWIu2&index=1&t=2132s

## A hack for Generic in arrow function

```js
//              🔻 the comma
const Table = <T,>(props: T) => return null;
```

## Retrieve from Generic params

```js
const getDeepProperty = <
O, 
FirstParam extends keyof O, 
SecondParam extends keyof O[FirstParams]
>(obj: O, firstParam: FirstParam, secondParam: SecondParam) => {}
```

## Zod

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