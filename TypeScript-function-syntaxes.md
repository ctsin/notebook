https://kentcdodds.com/blog/typescript-function-syntaxes

# Basics

```ts
// Simple type for a function, use =>
type FnType = (arg: ArgType) => ReturnType

// Every other time, use :
type FnAsObjType = {
  (arg: ArgType): ReturnType
}
  
interface InterfaceWithFn {
  fn(arg: ArgType): ReturnType
}

const fnImplementation = (arg: ArgType): ReturnType => {
  /* implementation */
}
```

# Can be useful if you want to add a typed property to the function

```ts
type MathFn = {
  (a: number, b: number): number
  operator: string
}
const sum: MathFn = (a, b) => a + b
sum.operator = '+'
```

This can also be done with an interface:

```ts
interface MathFn {
  (a: number, b: number): number
  operator: string
}
const sum: MathFn = (a, b) => a + b
sum.operator = '+'
```

And then there's `declare function` and `declare namespace`:

```ts
declare function MathFn(a: number, b: number): number
declare namespace MathFn {
  let operator: '+'
}

const sum: typeof MathFn = (a, b) => a + b
sum.operator = '+'
```

# Object properties and Methods

Object method:

```ts
const math = {
  sum(a: number, b: number): number {
    return a + b
  },
}
```

Property as function expression:

```ts
const math = {
  sum: function sum(a: number, b: number): number {
    return a + b
  },
}
```

Property as arrow function expression (with implicit return):

```ts
const math = {
  sum: (a: number, b: number): number => a + b,
}
```

Unfortunately, to extract the type you can't type the function itself, you have to type the enclosing object. You can't annotate the function with a type by itself when it's defined within the object literal:

```ts
type MathFn = (a: number, b: number) => number

const math: {sum: MathFn} = {
  sum: (a, b) => a + b,
}
```

Furthermore, if you want to add a property on it like some of the above examples, that is impossible to do within the object literal. You have to extract the function definition completely:

```ts
type MathFn = {
  (a: number, b: number): number
  operator: string
}
const sum: MathFn = (a, b) => a + b
sum.operator = '+'

const math = {sum}
```

You may have noticed that this example is identical to an example above with only the addition of the const math = {sum}. So yeah, there's no way to do all this inline with the object declaration.

# Classes

```ts
interface MathUtilsInterface {
  sum(a: number, b: number): number
}

class MathUtils implements MathUtilsInterface {
  sum(a: number, b: number): number {
    return a + b
  }
}
```

# Modules

Here's what we'd do assuming we export it as the default:

```ts
declare const sum: {
  (a: number, b: number): number
  operator: string
}
export default sum
```

And if we want it to be a named export:

```ts
declare const sum: {
  (a: number, b: number): number
  operator: string
}
export {sum}
```

# Async 

const sum = async (a: number, b: number): Promise<number> => a + b

```ts
async function sum(a: number, b: number): Promise<number> {
  return a + b
}
```

# Type Guards

```ts
type FalsyType = false | null | undefined | '' | 0

function typedBoolean<ValueType>(
  value: ValueType,
): value is Exclude<ValueType, FalsyType> { // 👈
  return Boolean(value)
}
```

# Assertion functions

```ts
type User = {
  name: string
  displayName: string | null
}

function assertDisplayName(
  user: User,
): asserts user is User & {displayName: string} {
  if (!user.displayName) throw new Error('Oh no, user has no displayName')
}

function logUserDisplayName(user: User) {
  assertDisplayName(user)
  console.log(user.displayName.toUpperCase())
}
```