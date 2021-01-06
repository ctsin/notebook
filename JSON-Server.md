# Customer Route

json-server allows you to create aliases for existing routes.

|Expression|Wildcard|Meaning|
|---|---|---|
|"/api/v1/:appid/show": "/cards/:appid"|:appid|The `--id` value in command line|
|"/user/*": "/$1"|*|All the string it present in url|
|"/:resource/:id/show": "/:resource/:id"|||
|"/:resource/:number": "/:resource?number=:number"|:resource|Resource section in localhost:3000
|"/articles\\?id=:id": "/posts/:id"|||

## Special routes

- localhost:3000/db => Database
- localhost:3000/__rules => All rules defined

## Hints

- JSON Server support objects or arrays of objects only.
- `--id` 用于映射 Server 关注的 `id` 在数据中为何键名。
- 当数据中的存在 number 和 string 混合的时候，新进数据的 `id` 会使用随机字符串，而不是默认的 number
- 如果在 JSON Server 运行时手动修改了数据，并 POST 入新数据，新数据会覆盖手动修改的部分。可以在手动修改后重启服务器来保留手动更改。
- 虚拟机不能访问到 localhost，需要转发 JSON Server 端口

  ```sh
  `adb reverse tcp:3000 tcp:3000`
  ```
  https://stackoverflow.com/questions/33704130/react-native-android-fetch-failing-on-connection-to-local-api