- [8 TypeScript Tips To Expand Your Mind (and improve your code)](#8-typescript-tips-to-expand-your-mind-and-improve-your-code)
  - [Generic functions vs any](#generic-functions-vs-any)
  - [Const Type Parameters](#const-type-parameters)
- [Resolve TypeScript Errors](#resolve-typescript-errors)
- [TS 5.3 Tips](#ts-53-tips)
- [8 Tips from the TS Wizard - using, as const, never](#8-tips-from-the-ts-wizard---using-as-const-never)
- [10 Tips for Mastering TypeScript Generics](#10-tips-for-mastering-typescript-generics)
  - [Constraints in functions](#constraints-in-functions)
  - [`as`: you know better than TypeScript](#as-you-know-better-than-typescript)
  - [Work with Zod](#work-with-zod)
- [Turn MODULES INTO TYPES with typeof import](#turn-modules-into-types-with-typeof-import)
- [Dynamic function arguments with GENERICS](#dynamic-function-arguments-with-generics)
- [Blazing Fast Tips: React \& TypeScript](#blazing-fast-tips-react--typescript)
  - [Event handler](#event-handler)
  - [React `children`](#react-children)
  - [useState](#usestate)
  - [Custom Hooks with `as`](#custom-hooks-with-as)
  - [Discriminated union in props](#discriminated-union-in-props)
  - [Generic Components](#generic-components)
- [13 `import` statement](#13-import-statement)
- [12 Make a loose auto completed](#12-make-a-loose-auto-completed)
- [8 Generic for React Components](#8-generic-for-react-components)
- [`Extends` in TypeScript](#extends-in-typescript)
- [Tips with `const` assertion](#tips-with-const-assertion)
- [A hack for Generic in arrow function](#a-hack-for-generic-in-arrow-function)
- [Retrieve from Generic params](#retrieve-from-generic-params)
- [Type-safe on `Object.keys()`](#type-safe-on-objectkeys)

# 8 TypeScript Tips To Expand Your Mind (and improve your code)

https://www.youtube.com/watch?v=QSIXYMIJkQg

## Generic functions vs any

Generic 类型的一个很重要的用例就是类型推断(inference)，例如 [Generic Components](#generic-components)

https://www.youtube.com/watch?v=QSIXYMIJkQg&t=227s

## Const Type Parameters

https://www.youtube.com/watch?v=QSIXYMIJkQg&t=296s

```ts
// Given
declare function useStatus<T>(statuses: T[]): T;

// loadingStatus: string
const loadingStatus = useStatus(['loading', 'idle'])

// 0
// (T as const) run into syntax error
declare function useStatus<T>(statuses: T[]): (T as const);


// 1
// A 'const' assertions can only be applied to references to enum members, or string, number, boolean, array, or object literals.
function useStatus<T>(statuses: T[]) {return statuses[0] as const};

declare function useStatus<const T>(statuses: T[]): T;

// 2 works
// const loadingStatus: "loading" | "idle"
const loadingStatus = useStatus(['loading', 'idle'])
```

# Resolve TypeScript Errors

https://www.totaltypescript.com/tutorials/solving-typescript-errors/errors/fixing-x-is-not-assignable-to-y

# TS 5.3 Tips

![](assets/TS-5.3.jpg)

# 8 Tips from the TS Wizard - using, as const, never

https://www.youtube.com/live/8HoOxOd86M4?feature=share&t=338

```js
interface O {
  name: string;
  school: string;
  age: number;
}

type K = "name" | "school" | never;

// type X = "name" | "school"
// Filter `never` with `[keyof O]`
type V = {
  [K in keyof O]: O[K] extends string ? K : never;
}[keyof O]
```

# 10 Tips for Mastering TypeScript Generics

## Constraints in functions

https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints

https://www.youtube.com/watch?v=dLPgQRbVquo&t=499s

We need to actually constrain this `O` object because you can't call `object.keys` on a number, or on a string. So we actually need to constrain it to be something that `object.keys` can handle.

```js
// This type parameter might need an `extends {}` constraint.
// This type parameter might need an `extends object` constraint.
const getKeys = <O>(obj: O) => Object.keys(obj);

// Resolved
const getKeys = <O extends Record<string, number>>(obj: O) => Object.keys(obj);
```

When you have a generic function, you're usually going to put a constrain on it.

- This give you control over what user inputs.
- Less logic statements.

## `as`: you know better than TypeScript

https://www.youtube.com/watch?v=dLPgQRbVquo&t=607s

```js
// Type 'string[]' is not assignable to type '(keyof O)[]'.
// Type 'string' is not assignable to type 'keyof O'.
// Type 'string' is not assignable to type 'never'.
const getKeys = <O extends {}>(obj: O): Array<keyof O> => Object.keys(obj);

// Resolved
const getKeys = <O extends {}>(obj: O): Array<keyof O> =>
  Object.keys(obj) as (keyof O)[];
```

## Work with Zod

https://www.youtube.com/watch?v=dLPgQRbVquo&t=900s

> NOT CLEAR YET

```js
const makeZodSafeFetch = <TData>(
  url: string,
  schema: z.Schema<TData>
): Promise<TData> => {
  return fetch(url)
    .then((res) => res.json())
    .then((res) => schema.parse(res));
};

const result = makeZodSafeFetch<Record<"firstName" | "lastName", string>>(
  "",
  {}
);
```

# Turn MODULES INTO TYPES with typeof import

https://www.youtube.com/watch?v=sswUBXaoXSI

```js
// constants.js
export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const EDIT_TODO = "EDIT_TODO";

// consumer.js
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

```js
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

```js
import { FocusEventHandler, FormEventHandler, MouseEventHandler } from "react";
interface ComponentProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  onFocus: FocusEventHandler<HTMLButtonElement>;
  onBlur: FocusEventHandler<HTMLButtonElement>;
  onChange: FormEventHandler<HTMLButtonElement>;
}
```

## React `children`

```js
import { ReactNode } from "react";
interface ComponentProps {
  children?: ReactNode;
}
```

## useState

```js
import { useState } from "react";

interface User {}

const Name = () => {
  // const name: User | undefined
  const [name, setName] = useState<User 💡 no need `null` here>();

  return null;
};
```

## Custom Hooks with `as`

```js
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

```js
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

Discriminated type requires the `type` property to be assigned.

```js
type Props =
  | {
      type?: "text";
    }
  | {
      type?: "password";
      visible: boolean;
    };
declare function input(props: Props): void;
// `visible` will not report an error as lack of `type` 
void input({ visible: true });
void input({ type: "password", visible: true }); // 💯
void input({ type: "text", visible: true }); // 🚨
```

## Generic Components

> https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#generic-components

```js
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

```js
// ./constants.js
export const TODO_ADD = "ADD";
export const TODO_REMOVE = "REMOVE";
export const TODO_EDIT = "EDIT";

// ./index.js
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

```js
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

```js
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

```js
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

```js
const objKeys = <T extends object>(obj: T) => Object.keys(obj) as (keyof T)[];
```
