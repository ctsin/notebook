## Array.prototype.slice

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

The `slice()` method returns a **shallow copy** of a portion of an array into a **new array object** selected from begin to end (end not included) where begin and end represent the index of items in that array. The original array will not be modified.

- 对于时间、id等可能为字符串或数值类型的情况，做强转防御。
- 适度抛错，便于QA排查。

## How to Update Angular

```bash
ng update @angular/cli @angular/core
```

## 可观察对象的退订

在 Angular 中，`HttpModule` 或 Rxjs `ajax` 方法不需要退订。因为这方法在请求完成后，会自动触发可观察对象的 `complete` 状态。

##思路

以 [`flatMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) 为引导，以理解“高阶可观察者”对象.

## 关于 React `useEffect` Hook 两点Get

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
