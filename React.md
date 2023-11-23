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
const Header = React.memo(({title}) => <h1>{title}</h1>, []);
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
import { useRef, forwardRef } from "react"

export function Parent() {
  const elementRef = useRef<HTMLDivElement>(null)

  return <Child ref={elementRef} />
}

const Child = forwardRef<HTMLDivElement>(function (props, ref) {
  return <div ref={ref}>Hello, World!</div>
})
```
