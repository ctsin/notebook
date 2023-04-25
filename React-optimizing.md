https://dev.to/headwayio/react-optimize-components-with-react-memo-usememo-and-usecallback-39h8

**Class Components**

- PureComponent
- shouldComponentUpdate

\*\*Functional Components

- React.memo
- useMemo
- useCallback.

**Heads up**

```ts
const Header = React.memo(({title}) => <h1>{title}</h1>));
export default Header;
```

The previous fashion will cause component to show up as `Unknow` in react dev tools. To fix this, wrap comp in `memo` after defining it, as following:

```ts
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
