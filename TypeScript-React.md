- [Inspired by Formik](#inspired-by-formik)
- [Type-safe on HTML elements](#type-safe-on-html-elements)
- [React.ComponentType](#reactcomponenttype)
- [Type a React form onSubmit handler](#type-a-react-form-onsubmit-handler)
- [Use Context effectively](#use-context-effectively)
- [Time and Date in JavaScript](#time-and-date-in-javascript)
  - [Using JavaScript Date Object’s Localization Functions](#using-javascript-date-objects-localization-functions)
- [Event in React with TypeScript](#event-in-react-with-typescript)
- [Two methods to define props type](#two-methods-to-define-props-type)
- [What's the differences between the method above](#whats-the-differences-between-the-method-above)
- [FC vs FunctionComponent](#fc-vs-functioncomponent)
- [TypeScript with Class component](#typescript-with-class-component)
- [Event interface](#event-interface)
- [What if there is no matching type definition?](#what-if-there-is-no-matching-type-definition)
- [Tip: How to find type definitions for any event](#tip-how-to-find-type-definitions-for-any-event)


# Inspired by Formik

> packages/formik/src/Formik.tsx:1009

```jsx
<FormikProvider value={formikbag}>
  {component
    ? React.createElement(component as any, formikbag)
    : render
    ? render(formikbag)
    : children // children come last, always called
    ? isFunction(children)
      ? (children as (bag: FormikProps<Values>) => React.ReactNode)(
          formikbag as FormikProps<Values>
        )
      : !isEmptyChildren(children)
      ? React.Children.only(children)
      : null
    : null}
</FormikProvider>
```

```jsx
import { ComponentType, ReactNode } from "react";

interface Values {
  email: string;
  password: string;
}

interface MilkProps<T> {
  initialValue?: T;
  onClick?(value: T): void;
  component?: ComponentType<T> | ReactNode;
  children?: ((props: T) => ReactNode) | ReactNode;
}

export const Milk = <T,>({
  initialValue,
  component,
  children,
}: MilkProps<T>) => {
  return null;
};

export const Host = () => {
  return (
    <>
      {/* 猜测这里 T 的推断是以先实例化者为依据 */}
      {/* 例如，在定义 `initialValue` 时，`PreEmail` 的类型定义已经实例化。
          所以，`initialValue` 要受到 `Values` 类型的约束
      */}
      {/* component: ComponentType<T> */}
      <Milk initialValue={{ email: "", password: "" }} component={PreEmail} />

      {/* component: ReactNode */}
      <Milk component={<PreEmail email="" password="" />} />

      {/* 而在这里，`initialValue` 已经实例化。所以，`props` 受到 `{ name: string; }` 约束 */}
      {/* children: ((props: T) => ReactNode) */}
      <Milk initialValue={{ name: "" }}>{(props) => null}</Milk>

      {/* 同样，`onClick` 回调先行实例化。所以，`value` 受到 `{ balabala: string; }` 类型的类型约束 */}
      {/* children: ReactNode; */}
      <Milk
        onClick={(value: { balabala: string }) => value}
        initialValue={{ balabala: "" }}
      >
        <Email />
      </Milk>
    </>
  );
};

const PreEmail = ({ password, email }: Values) => {
  return (
    <>
      <pre>{JSON.stringify(password)}</pre>
      <pre>{JSON.stringify(email)}</pre>
    </>
  );
};

const Email = () => {
  return <pre>"Email Component"</pre>;
};
```

# Type-safe on HTML elements

https://x.com/mattpocockuk/status/1818675230207782929

![](https://pbs.twimg.com/media/GT07e6KWQAAugtz?format=jpg&name=small)

https://www.youtube.com/watch?v=4GchlC06ca0

```js
import React, { InputHTMLAttributes, ComponentProps } from "react";

interface InputPropsWithInputHTMLAttributes
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface InputPropsWithComponentProps extends ComponentProps<"input"> {
  label: string;
}

export const Input = ({ label, ...props }: InputPropsWithComponentProps) => {
  // InputPropsWithComponentProps
  // (parameter) props: {
  //   ref?: React.LegacyRef<HTMLInputElement> | undefined;
  //   key?: React.Key | null | undefined;
  //   accept?: string | undefined;
  //   alt?: string | undefined;
  //   ... 286 more ...;
  //   onTransitionEndCapture?: React.TransitionEventHandler<...> | undefined;
  // }

  // InputPropsWithInputHTMLAttributes
  // (parameter) props: {
  //   accept?: string | undefined;
  //   alt?: string | undefined;
  //   autoComplete?: string | undefined;
  //   autoFocus?: boolean | undefined;
  //   capture?: boolean | "user" | "environment" | undefined;
  //   ... 283 more ...;
  //   onTransitionEndCapture?: React.TransitionEventHandler<...> | undefined;
  // }

  return (
    <>
      <label>{label}</label>
      <input {...props} />
    </>
  );
};

```

# React.ComponentType

```js
import React, {ComponentType} from "react";
declare const Login: ComponentType;

interface ProfileProps {
    name: string;
}
declare const Profile: ComponentType<ProfileProps>;

interface PrivateProps<T>{
    isLoggedIn: boolean;
    component: ComponentType<T>;
}

const Private = ({isLoggedIn, component: Component}: PrivateProps<ProfileProps>) => {
    if(isLoggedIn) {
        return <Component name="Foo" />;
    }

    return <Login />
}

const App = () => <Private isLoggedIn={true} component={Profile} />
```

# Type a React form onSubmit handler

https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/

```js
import * as React from 'react'
interface FormElements extends HTMLFormControlsCollection {
  usernameInput: HTMLInputElement
}
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements
}
function UsernameForm({
  onSubmitUsername,
}: {
  onSubmitUsername: (username: string) => void
}) {
  function handleSubmit(event: React.FormEvent<UsernameFormElement>) {
    event.preventDefault()
    onSubmitUsername(event.currentTarget.elements.usernameInput.value)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input id="usernameInput" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
```


# Use Context effectively

https://kentcdodds.com/blog/how-to-use-react-context-effectively

```js
type Action = {type: 'increment' | 'decrement'}
type Dispatch = (action: Action) => void
type State = {count: number}
type CountProviderProps = {children: React.ReactNode}

const CountStateContext = React.createContext<
  {state: State; dispatch: Dispatch} | undefined // 👈
>(undefined)

function countReducer(state: State, action: Action) {
  switch (action.type) {
    case 'increment': {
      return {count: state.count + 1}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`) // 👈 Exception
    }
  }
}

function CountProvider({children}: CountProviderProps) {
  const [state, dispatch] = React.useReducer(countReducer, {count: 0})
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = {state, dispatch}
  return (
    <CountStateContext.Provider value={value}>
      {children}
    </CountStateContext.Provider>
  )
}

function useCount() {
  const context = React.useContext(CountStateContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider') // Exception
  }
  return context
}

export {CountProvider, useCount}
```

# Time and Date in JavaScript

https://www.toptal.com/software/definitive-guide-to-datetime-manipulation

## Using JavaScript Date Object’s Localization Functions

> If you want the browser to automatically use the user’s locale, you can pass `undefined` as the first parameter.


| Code                                                                                                                                                                                                                         | Output                  | Description                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | --------------------------------------------------------- |
| now.toLocaleTimeString()                                                                                                                                                                                                     | "4:21:38 AM"            | Display localized version of only time                    |
| now.toLocaleTimeString(undefined, {<br />&nbsp;&nbsp;hour: '2-digit',<br />&nbsp;&nbsp;minute: '2-digit',<br />&nbsp;&nbsp;second: '2-digit',<br />});                                                                       | "04:21:38 AM"           | Display localized time based on options provided          |
| now.toLocaleString()                                                                                                                                                                                                         | "7/22/2016, 4:21:38 AM" | Display date and time for user's locale                   |
| now.toLocaleString(undefined, {<br />&nbsp;&nbsp;day:    'numeric',<br />&nbsp;&nbsp;month:  'numeric',<br />&nbsp;&nbsp;year:   'numeric',<br />&nbsp;&nbsp;hour:   '2-digit',<br />&nbsp;&nbsp;minute: '2-digit',<br />}); | "7/22/2016, 04:21 AM"   | Display localized date and time based on options provided |

# Event in React with TypeScript

https://www.newline.co/@bespoyasov/how-to-handle-keyboard-input-events-in-react-typescript-application--9b21764e

```js
const log = (e: SyntheticEvent<HTMLInputElement>): void => {
  // ...
}

const log = (e: ChangeEvent<HTMLInputElement>): void => {
  // ...
}

const log = (e: KeyboardEvent<HTMLInputElement>): void => {
  // ...
}
```


https://felixgerschau.com/react-typescript-components/

# Two methods to define props type

With `FC`: 

```js
interface TitleProps {
  title: string;
}

const Title: FC<TitleProps> = ({ title, subtitle }) => {
  return (
    <>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </>
  );
};

export default Title;
```

With inline type definition

```js
const Title = ({ title, subtitle }: TitleProps) => {
  // ...
}
```

# What's the differences between the method above

The reason why you might want to use a generic type like FC is that this comes with all the typings that you could possibly need for a function component, e.g. `children`.

# FC vs FunctionComponent

A quick look at React's type definitions revealed that FC is just the shorthand for FunctionComponent. Both refer to the same interface.

```js
type FC<P = {}> = FunctionComponent<P>;
```

# TypeScript with Class component

```js
interface TitleProps {
  title: string;
  subtitle?: string;
}

class Title extends Component<TitleProps, TitleState> {
  public static defaultProps = { title: 'Hey there!', };
  //...
  constructor(props: TitleProps) { super(props); }

  this.state = {
    counter: 0,
  };
}
```

# Event interface

https://felixgerschau.com/react-typescript-events/

```js
import React, { ChangeEventHandler, ChangeEvent } from 'react';

// This
const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {}

// is the same as this
const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {}
```

# What if there is no matching type definition?

In case that there is no definition for the event handler you are trying to use, you can use React's SyntheticEvent type.

All events build on top of this definition, so this should be compatible with all event handlers.

# Tip: How to find type definitions for any event

Jump to the definition in your editor with <kbd>F12</kbd>