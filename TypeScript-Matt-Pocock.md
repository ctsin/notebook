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
// also works rather than the types explictly defined
const s2: SizeOmitted = 'something'

// step futher with Generic Types
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