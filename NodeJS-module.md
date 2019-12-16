Nodejs 的 v13.2 版本已经默认打开了 ES6 模块支持。

现在的方案是，`.mjs`文件名后缀按ES6模块加载，`.cjs`后缀按CommonJS模块加载，`.js`后缀取决于 package.json 里面的 type 字段是否设为`module`。

![NodeJS module definition in package.json](https://pbs.twimg.com/media/EL5OyS2UEAA809g?format=jpg&name=small)
