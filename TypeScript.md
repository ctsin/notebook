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