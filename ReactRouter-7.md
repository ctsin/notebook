# action and loader

| 方法 **          | 自动触发 loader | 页面状态       | 适用场景                   |
| :------------- | :-------------- | :------------- | :------------------------- |
| Form           | ✅               | 会显示 loading | 主要操作，需要刷新页面数据 |
| useSubmit      | ✅               | 会显示 loading | 编程式主要操作             |
| fetcher.submit | ❌               | 不影响页面状态 | 后台操作                   |
| fetcher.Form   | ❌               | 不影响页面状态 | 后台表单操作               |

> ** 在目标为当前路由时，上面四项都会刷新当前 `loader`. React Router 考虑这个操作可能会影响当前页面状态。

- 当表单 `action` 的目标地址是当前路由时，浏览器路由历史不会添加新值，页面标签上的 favicon 不会 loading。
- 如果 `action` 的目标地址不是当前路由，那么那个目标路由的 `action` 会被调用。如果调用成功，目标 `loader` 会被触发。The sequence is: Form submit → /create action → /create loader → Navigate to /create page.

# `fetcher.submit` and `fetcher.Form` cases

I can see "Loader Data" updated, but "Action Data" didn't. Why?

This reveals a key difference between how React Router handles action data.

**useActionData() vs fetcher.data:**

- `useActionData()` Only shows data from navigation-based form submissions ( `<Form>`, `useSubmit`)
- `fetcher.data` Shows data from fetcher-based submissions ( `fetcher.submit`, `fetcher.Form`)

**Why you see this behavior:**

- Fetcher Submit/Form → Action runs → Result goes to fetcher.data ✅
- Fetcher Submit/Form → Loader runs (same route) → useLoaderData() updates ✅
- Fetcher Submit/Form → useActionData() stays empty ❌

The reason: `useActionData()` is tied to the route's navigation state , while fetchers operate independently of navigation.

# `action` in form component

| action 值      | 行为           |
| :------------- | :------------- |
| 不传 / "."     | 提交到当前路由 |
| "/other/route" | 提交到指定路由 |
| "../parent"    | 交到父路由     |
| "?index"       | 到 index 路由  |

# `loader` in route

一个路由文件中只能有一个 loader 函数。

**Solutions**

1. 在单个 loader 中处理多个数据源
2. 使用 fetcher 加载额外数据
3. 创建嵌套路由
4. 使用 clientLoader (客户端数据)

# `action` in route

一个路由文件中只能有一个 action 函数。

**Solutions**

在单个 action 中根据表单数据区分操作，并使用隐藏字段区分操作。

```js
export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "add-similar":
      const selectedIds = JSON.parse(formData.get("selectedIds") as string);
      // 添加相似词逻辑
      break;
    
    case "delete-word":
      // 删除词汇逻辑
      break;
    
    case "update-definition":
      // 更新定义逻辑
      break;
  }
}

// 表单 1
<Form method="post">
  <input type="hidden" name="intent" value="add-similar" />
  <input name="selectedIds" />
</Form>

// 表单 2
<Form method="post">
  <input type="hidden" name="intent" value="delete-word" />
  <input name="wordId" />
</Form>
```

创建专门的 API 路由。

```js
routes/
  vocabulary.$id.tsx           // 主要 action
  api.add-similar.tsx         // 专门的 action
  api.delete-word.tsx         // 专门的 action

const addFetcher = useFetcher();
const deleteFetcher = useFetcher();

// 提交到不同的 API 路由
addFetcher.submit(data, { action: "/api/add-similar", method: "post" });
deleteFetcher.submit(data, { action: "/api/delete-word", method: "post" });
```
# React Router 7 中重新触发 loader 的方法

## 自动触发 loader
1. Form 提交 ✅ 最常用

```js
<Form method="post">
  <button type="submit">Submit</button>
</Form>
// 提交后自动重新调用 loader
```

2. useSubmit ✅ 编程式提交

```js
const submit = useSubmit();
submit(formData, { method: "post" });
// 提交后自动重新调用 loader
```

3. URL 参数变化 ✅ 自动触发

```js
// 当路由参数变化时自动重新调用 loader
navigate(`/vocabulary/${newId}`);
```

## 手动触发 loader

4. navigate(0) ✅ 刷新当前页面

```js
const navigate = useNavigate();
navigate(0); // 相当于刷新页面
```

5. useRevalidator ✅ 专门用于重新验证
```js
import { useRevalidator } from "react-router";

const revalidator = useRevalidator();
revalidator.revalidate(); // 重新调用所有 loader
```

6. fetcher.load() ✅ 加载特定路由数据

```js
const fetcher = useFetcher();
fetcher.load("/current/route"); // 重新加载当前路由的 loader
```

7. window.location.reload() ❌ 不推荐

```js
window.location.reload(); // 完全刷新页面，失去 SPA 优势
```

## 推荐使用

1. `Form` 提交: 最佳实践，自动处理
2. `useRevalidator`: 手动刷新的首选
3. `navigate(0)`: 简单粗暴的刷新方式

# FormData

The `formData` behaves differently based on what you pass to submit:

1 Plain object

```js
submit({ relatedId: vocabId, isExisted })
```

React Router converts this to `FormData` automatically. All values become strings.

```
`isExisted: true` becomes "true"
`isExisted: false` becomes "false"
```

2 FormData instance:

```js
const form = new FormData();
form.append("relatedId", vocabId);
form.append("isExisted", isExisted.toString());
submit(form);
```

Values are exactly what you append. You control the string conversion.