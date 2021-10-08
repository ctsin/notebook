# Use Context effectively

https://kentcdodds.com/blog/how-to-use-react-context-effectively

```ts
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

```ts
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

```ts
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

```ts
const Title = ({ title, subtitle }: TitleProps) => {
  // ...
}
```

# What's the differences between the method above

The reason why you might want to use a generic type like FC is that this comes with all the typings that you could possibly need for a function component, e.g. `children`.

# FC vs FunctionComponent

A quick look at React's type definitions revealed that FC is just the shorthand for FunctionComponent. Both refer to the same interface.

```ts
type FC<P = {}> = FunctionComponent<P>;
```

# TypeScript with Class component

```ts
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

```ts
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