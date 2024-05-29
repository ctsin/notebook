https://dev.to/headwayio/react-optimize-components-with-react-memo-usememo-and-usecallback-39h8

**Class Components**

- PureComponent
- shouldComponentUpdate

**Functional Components**

- React.memo
- useMemo
- useCallback.

**Heads up**

```js
const Header = React.memo(({ title }) => <h1>{title}</h1>, []);
export default Header;
```

The previous fashion will cause component to show up as `Unknow` in react dev tools. To fix this, wrap comp in `memo` after defining it, as following:

```js
const Header = ({ title }) => <h1>{title}</h1>;
export default React.memo(Header);
```

# What’s New in React 18

New Feature: Automatic Batching

| Before 18            | After 18              |
| -------------------- | --------------------- |
| React event handlers | promises              |
|                      | setTimeout            |
|                      | native event handlers |
|                      | or any other event    |

# React `forwardRef()`: How to Pass Refs to Child Components

https://dmitripavlutin.com/react-forwardref/

https://react.dev/reference/react/useImperativeHandle

https://dmitripavlutin.com/react-forwardref/#53-anonymous-component

In React dev tools an anonymous function wrapped in forwardRef() results in a component with an unmeaningful name.

https://dmitripavlutin.com/react-forwardref/#6-forwardref-in-typescript

`forwardRef<V, P>()` accepts 2 argument types:

- `V` is the type of the value stored in a ref, which is usually an `HTMLDivElement` or `HTMLInputElement`
- `P` is the props type of the wrapped component

`useRef<V>()` hook in TypeScript has one argument type `V`: denoting the value type stored in the ref. If you store DOM elements in the ref, `V` can be HTMLDivElement or HTMLInputElement.

Now let's annotate the parent and child components:

```ts
import { useRef, forwardRef } from "react";

export function Parent() {
  const elementRef = useRef<HTMLDivElement>(null);

  return <Child ref={elementRef} />;
}

const Child = forwardRef<HTMLDivElement>(function (props, ref) {
  return <div ref={ref}>Hello, World!</div>;
});
```

# React Memory Leaks: How useCallback and closures can bite you

https://schiener.io/2024-03-03/react-closures

## Closures and `useCallback`

```js
import { useState, useCallback } from "react";

class BigObject {
  public readonly data = new Uint8Array(1024 * 1024 * 10); // 10MB of data
}

function App() {
  const [count, setCount] = useState(0);
  const bigData = new BigObject();

  const handleEvent = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const handleClick = () => {
    console.log(bigData.data.length);
  };

  return (
    <div>
      <button onClick={handleClick} />
      <ExpensiveChildComponent2 onMyEvent={handleEvent} />
    </div>
  );
}
```

All closures share a common context object from the time they were created. Since handleClick() closes over bigData, bigData will be referenced by this context object. This means, bigData will never get garbage collected as long as handleEvent() is being referenced. This reference will hold until count changes and handleEvent() is recreated.

![Big object capture](https://schiener.io/assets/img/react-closures-bigObjectCapture.png)

# Snappy UI Optimization with useDeferredValue

- https://www.joshwcomeau.com/react/use-deferred-value/
- https://react.dev/reference/react/useDeferredValue
- https://react.dev/blog/2024/04/25/react-19#use-deferred-value-initial-value

# memoization required

An important thing to note: useDeferredValue only works when the slow / low-priority component has been wrapped with React.memo():

```js
import React from 'react';
function SlowComponent({ count }) {}

export default React.memo(SlowComponent);
```

## Working with multiple state variables

Don't:

```js
const deferredOomph = React.useDeferredValue(oomph);
const deferredCrispy = React.useDeferredValue(crispy);
const deferredBg = React.useDeferredValue(backgroundColor);
const deferredTint = React.useDeferredValue(tint);
const deferredResolution = React.useDeferredValue(resolution);
const deferredLight = React.useDeferredValue(lightPosition);
```

Do:

```js
const cssCode = generateShadows(oomph, crispy, backgroundColor, tint, resolution, lightPosition);
const deferredCssCode = React.useDeferredValue(cssCode);
return (
  <>
    {/* Other stuff omitted for brevity */}
    <CodeSnippet lang="css" code={deferredCssCode} />
  </>
);
```