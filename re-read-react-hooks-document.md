**React Hooks 官方文档重读**

https://reactjs.org/docs/hooks-faq.html

## 关于 React `useEffect` Hook 两点 Get

**以下代码会在由 0 变为 1 后，在视图中一直显示 1**

来源：https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often

演示：https://stackblitz.com/edit/react-ts-useeffect-bug

```ts
function Counter() {
  const [count, setCount] = useState(0); // 初始 count
  console.log("Outside", count);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
      // Fix
      // setCount(c => c + 1); // ✅ This doesn't depend on `count` variable outside. 通过参数形式访问 count, React Hook 机制保证其为更新值。
      console.log("Inside", count); // 作为 setInterval 的回调，作用域内的 count 通过闭包访问到了初始 count, 并一直保持该值。
    }, 1000);
    return () => clearInterval(id);
  }, []); // 1. [] 决定了 useEffect 回调只会在组件初始时运行
  return <h1>{count}</h1>;
}
```

> 一个知识点：`useState` 的 `setter` 方法可以避免通过闭包取 `state` 更新值。

**一个 `useRef` 场景**

```ts
function Example(props) {
  // Keep latest props in a ref.
  const latestProps = useRef(props);
  useEffect(() => {
    latestProps.current = props;
  });

  useEffect(() => {
    function tick() {
      // Read latest props at any time
      console.log(latestProps.current);
    }

    const id = setInterval(tick, 1000); // 在异步访问 Props 的过程中，通过 latestProps.current 保持引用。
    return () => clearInterval(id);
  }, []); // This effect never re-runs}
```

# How do I implement shouldComponentUpdate?

```ts
const Button = React.memo((props) => {
  // your component
});
```

# How to memoize calculations?

```ts
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

**注意：** `useMemo` 的回调每次 render 过程中都会调用，不要在此作 sideEffect 动作。

# How to create expensive objects lazily?

如果计算 `useState` 的初始状态非常昂贵，应该重构为 **回调** 方式，React 只会在初始 Render 时调用该回调。

```ts
function Table(props) {
  // ⚠️ createRows() is called on every render
  const [rows, setRows] = useState(createRows(props.count));
  // ...
}

// To avoid re-creating the ignored initial state, we can pass a function to useState:

function Table(props) {
  // ✅ createRows() is only called once
  const [rows, setRows] = useState(() => createRows(props.count));
  // ...
}
```

如果 `useRef` 的初始计算非常昂贵：

```ts
function Image(props) {
  // ⚠️ IntersectionObserver is created on every render
  const ref = useRef(new IntersectionObserver(onIntersect));
  // ...
}
```

useRef does not accept a special function overload like useState. Instead, you can write your own function that creates and sets it lazily:

```ts
function Image(props) {
  const ref = useRef(null);

  // ✅ IntersectionObserver is created lazily once
  function getObserver() {
    if (ref.current === null) {
      ref.current = new IntersectionObserver(onIntersect);
    }
    return ref.current;
  }

  // When you need it, call getObserver()
  // ...
}
```
