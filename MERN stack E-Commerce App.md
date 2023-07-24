https://www.youtube.com/watch?v=A_-fn_ij59c

Source Code: https://github.com/techinfo-youtube/ecommerce-app-2023/tree/15-admin-orders-css

```ts
const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
  console.log(event.target.files);
  setImg(event.target.files?.[0] ?? null);
};

<div className="App">
  <label htmlFor="file">Upload</label>
  <input
    type="file"
    name="file"
    id="file"
    accept="image/*"
    onChange={onChange}
    hidden
  />
  {img && <img src={URL.createObjectURL(img)} alt="" />}
</div>
```