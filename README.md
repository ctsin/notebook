**Array.prototype.slice** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

The `slice()` method returns a **shallow copy** of a portion of an array into a **new array object** selected from begin to end (end not included) where begin and end represent the index of items in that array. The original array will not be modified.

- 对于时间、id等可能为字符串或数值类型的情况，做强转防御。
- 适度抛错，便于QA排查。

**How to Update Angular**: `ng update @angular/cli @angular/core`

**可观察对象的退订**：在 Angular 中，`HttpModule` 或 Rxjs `ajax` 方法不需要退订。因为这方法在请求完成后，会自动触发可观察对象的 `complete` 状态。

**思路**：以 [`flatMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) 为引导，以理解“高阶可观察者”对象.
