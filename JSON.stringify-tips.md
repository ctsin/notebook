https://javascript.info/json

# [What to be converted](https://javascript.info/json#json-stringify)
Acceptable value
- Objects `{...}`
- Arrays `[...]`
- Primitives:
  - strings,
  - numbers,
  - boolean values `true/false`
  - null
  
The following value will be **ignored**:
- Function properties(methods)
- Symbolic properties
- Properties that store `undefined`

For instance
```js
let user = {
  sayHi() { // ignored
    alert("Hello");
  },
  [Symbol("id")]: 123, // ignored
  something: undefined // ignored
};

alert( JSON.stringify(user) ); // {} (empty object)
```

> **ATTENTION** circular references will cause an error.

# [Additional parameters](https://javascript.info/json#excluding-and-transforming-replacer)
The full syntax of `JSON.stringify` is:
```js
const json = JSON.stringify(value[, replacer, space])
```
| Parameter | meaning|
| --- | --- |
| value | A value to encode |
| replacer | Array of properties to encode or a mapping function `function(key, value)`. |
| space | Amount of space to use for formating |
