# Access `this` from Static method

https://2ality.com/2019/11/creating-class-instances.html#solution%3A-static-factory-method

```js
class DataContainer {
  #data;
  static async create() {
    const data = await Promise.resolve('downloaded');
    return new this(data);
  }
  constructor(data) {
    this.#data = data;
  }
  getData() {
    return 'DATA: '+this.#data;
  }
}
DataContainer.create()
  .then(dc => assert.equal(
    dc.getData(), 'DATA: downloaded'));
```