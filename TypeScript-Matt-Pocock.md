# 13 `import` statement

https://twitter.com/i/status/1508408811635322883

```ts
// ./constants.ts
export const TODO_ADD = "ADD"
export const TODO_REMOVE = "REMOVE"
export const TODO_EDIT = "EDIT"

// ./index.ts
// 🚀 
type Actions = typeof import('./constants')

// Actions will receive an object types.
const actions: Actions = {TODO_EDIT: "EDIT", TODO_ADD: "ADD", TODO_REMOVE: "REMOVE"}

// alias 
// type Keys = "ADD" | "REMOVE" | "EDIT"
type Keys = Actions[keyof Actions]
```

# 12 Make a loose auto completed

https://twitter.com/i/status/1506607945445949446

```ts
type Size = 'xs' | 'md'
type SizeOmitted = 'xs' | 'md' | Omit<string, "xs" | 'md'>

// 'xs' | 'md' available for auto complete
const s1: SizeOmitted = 'md'
// also works rather than the types explicitly defined
const s2: SizeOmitted = 'something'

// step further with Generic Types
type LooseString<T extends string> = T | Omit<string, T>
const s3: LooseString<Size> = 'md'
```

# 8 Generic for React Components

https://twitter.com/i/status/1503352924537339904

```ts
type HelloProps<T> = {
  items: T[];
}

export function Hello <T>({items}: HelloProps<T>) {
  return (<div>{items.map(item => <div key={String(item)}>{item}</div>)}</div>)
}

export const SayHello = () => (
  <Hello<{items: string[]}> items={[1, 2]} />
)
```

# `Extends` in TypeScript

```ts
const obj = {
  foo: {
    a: 1,
    b: 2,
  },
  bar: {
    c: 3,
    d: 4,
  }
}

declare const getDeepValue = <Obj, FirstKey extends keyof Obj, SecondKey extends keyof FirstKey>(obj: Obj, firstKey: FirstKey, secondKey: SecondKey) : Obj[FirstKey][SecondKey];

const result = getDeepValue(obj, 'foo', 'a');
```

# Tips with `const` assertion

```js
const useFirstName = () => {
  const [firstName, setFirstName] = useState("");

  return [firstName, setFirstName] as const 🚀;
}

const createUser = () => ({
  name: "Tsing",
  role: "admin" as const 🚀,
})
```

# A hack for Generic in arrow function

https://www.youtube.com/watch?v=hBk4nV7q6-w&list=PLed0-rd1pwrdEcPWmwG50Pt_FLiEtWIu2&index=1&t=2132s

```js
//              🔻 the comma
const Table = <T,>(props: T) => null;
```

# Retrieve from Generic params

```js
const getDeepProperty = <
O, 
FirstParam extends keyof O, 
SecondParam extends keyof O[FirstParams]
>(obj: O, firstParam: FirstParam, secondParam: SecondParam) => {}
```

# Type-safe on `Object.keys()`

![](https://pbs.twimg.com/media/FpAgLBIXwAASxH4?format=jpg&name=small)

```ts
const objKeys = <T extends object>(obj: T) => (Object.keys(obj) as (keyof T)[])
```