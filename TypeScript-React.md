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