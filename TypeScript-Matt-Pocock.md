# Turn MODULES INTO TYPES with typeof import

https://www.youtube.com/watch?v=sswUBXaoXSI

```ts
// constants.ts
export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const EDIT_TODO = "EDIT_TODO";

// consumer.ts
export type ActionModule = typeof import("./t1");

/**
 * export const ADD_TODO = "ADD";
export const REMOVE_TODO = "REMOVE";
export const EDIT_TODO = "EDIT";

 * export const actionModule: ActionModule = {
  ADD_TODO: "ADD",
  REMOVE_TODO: "REMOVE",
  EDIT_TODO: "EDIT",
};
 */
export const actionModuleFoo: ActionModule = {
  ADD_TODO: "ADD",
  REMOVE_TODO: "REMOVE",
  EDIT_TODO: "EDIT",
};

// type ActionKeys = "ADD_TODO" | "REMOVE_TODO" | "EDIT_TODO"
export type ActionKeys = keyof ActionModule;

// type Action = "ADD" | "REMOVE" | "EDIT"
export type Action = ActionModule[keyof ActionModule];
```

# Dynamic function arguments with GENERICS

https://www.youtube.com/watch?v=YE_3WwX-Dl8

```ts
type Evt =
  | {
      type: "SIGN_IN";
      payload: {
        userID: string;
      };
    }
  | { type: "SIGN_OUT" };

// const sendEvent = (eventType: Evt["type"], payload?: any) => {}
declare function sendEvent<T extends Evt["type"]>(
  ...args: Extract<Evt, { type: T }> extends { payload: infer Payload }
    ? [type: T, payload: Payload]
    : [type: T]
): void;

// Correct
sendEvent("SIGN_OUT");
sendEvent("SIGN_IN", { userID: "123" });

// Should Error
sendEvent("SIGN_OUT", {});
sendEvent("SIGN_IN", { userID: 123 });
sendEvent("SIGN_IN", {});
sendEvent("SIGN_IN");
```

# Blazing Fast Tips: React & TypeScript

https://www.youtube.com/watch?v=37PafxU_uzQ

## Event handler

```ts
import { FocusEventHandler, FormEventHandler, MouseEventHandler } from "react";
interface ComponentProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  onFocus: FocusEventHandler<HTMLButtonElement>;
  onBlur: FocusEventHandler<HTMLButtonElement>;
  onChange: FormEventHandler<HTMLButtonElement>;
}
```

## React `children`

```ts
import { ReactNode } from "react";
interface ComponentProps {
  children?: ReactNode;
}
```

## useState

```ts
import { useState } from "react";

interface User {}

const Name = () => {
  // const name: User | undefined
  const [name, setName] = useState<User 💡 no need `null` here>();

  return null;
};
```

## Custom Hooks with `as`

```ts
import { useState } from "react";

const useHome = () => {
  const [state, setState] = useState(0);

  return [state, setState] as const; 🚀
};

const Home = () => {
  const [home, setHome] = useHome()

  setHome(9)

  return null;
}
```

## Discriminated union in props

Supposing that `confirmButtonMassage` only belongs to `confirm` type. A union type can be used instead of an optional props indicator.

```ts
interface ModalProps {
  type: "alert" | "confirm";
  confirmButtonMassage?: string;
}

// 🚀
type ModalPropsUnion =
  | {
      type: "alert";
    }
  | {
      type: "confirm";
      confirmButtonMassage: string;
    };
```

## Generic Components

```ts
import React, { useState } from "react";

type TableProps<T> = {
  data: T[];
  onRowClick(row: T): void;
};

const Table = <T,>(props: TableProps<T>) => null;

const Parent = () => (
  <Table
    data={[{ name: "Foo" }]}
    onRowClick={(row) => {
      void row.name; 🚀
    }}
  />
);
```

# 13 `import` statement

https://twitter.com/i/status/1508408811635322883

```ts
// ./constants.ts
export const TODO_ADD = "ADD";
export const TODO_REMOVE = "REMOVE";
export const TODO_EDIT = "EDIT";

// ./index.ts
// 🚀
type Actions = typeof import("./constants");

// Actions will receive an object types.
const actions: Actions = {
  TODO_EDIT: "EDIT",
  TODO_ADD: "ADD",
  TODO_REMOVE: "REMOVE",
};

// alias
// type Keys = "ADD" | "REMOVE" | "EDIT"
type Keys = Actions[keyof Actions];
```

# 12 Make a loose auto completed

https://twitter.com/i/status/1506607945445949446

```ts
type Size = "xs" | "md";
type SizeOmitted = "xs" | "md" | Omit<string, "xs" | "md">;

// 'xs' | 'md' available for auto complete
const s1: SizeOmitted = "md";
// also works rather than the types explicitly defined
const s2: SizeOmitted = "something";

// step further with Generic Types
type LooseString<T extends string> = T | Omit<string, T>;
const s3: LooseString<Size> = "md";
```

# 8 Generic for React Components

https://twitter.com/i/status/1503352924537339904

```ts
type HelloProps<T> = {
  items: T[];
};

export function Hello<T>({ items }: HelloProps<T>) {
  return (
    <div>
      {items.map((item) => (
        <div key={String(item)}>{item}</div>
      ))}
    </div>
  );
}

export const SayHello = () => <Hello<{ items: string[] }> items={[1, 2]} />;
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
const Table = <T>(props: T) => null;
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
const objKeys = <T extends object>(obj: T) => Object.keys(obj) as (keyof T)[];
```
