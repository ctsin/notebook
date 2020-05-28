**Array.prototype.slice** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

The `slice()` method returns a **shallow copy** of a portion of an array into a **new array object** selected from begin to end (end not included) where begin and end represent the index of items in that array. The original array will not be modified.

- 对于时间、id等可能为字符串或数值类型的情况，做强转防御。
- 适度抛错，便于QA排查。
