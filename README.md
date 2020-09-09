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

## Disabled type check temporarily

https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html

With the following comments: `// @ts-nocheck`, `// @ts-check`, and `// @ts-ignore`.

**Heads up:** if you have a `tsconfig.json`, JS checking will respect strict flags like `noImplicitAny`, `strictNullChecks`, etc.

## DOM 事件的行内回调形式
行内回调的语句可以拿到 `event` 对象: 

```html
<input onkeyup="peopleStore[1].name = event.target.value" />
```

# Solve the Enzyme config issue in codesandbox.io

**Issue**

```bash
Enzyme Internal Error: Enzyme expects an adapter to be configured, but found none.
```

**Fix** ([Source](https://codesandbox.io/s/determined-chaplygin-8jt5f?file=/src/components/__tests__/RemotePizza_di.spec.js))

```ts
// This line is only needed for CodeSandbox
   import '../../../src/setupTests.js';
```

# Prettier End of Line 

https://prettier.io/docs/en/options.html#end-of-line

```sh
# .prettierrc
{ "endOfLine": "auto" }
```

# Debug React Native in VS Code

1. Install [React Native Tools](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native);
2. `yarn start` or `npm start` to boost the application, and then **disable the remote debug option**;
   
![disable remote debug](./disable-debug-remote-JS.png)

3. Launch the Debug in VS Code

![attach to package](./attach-to-package.png)

4. Check out the console log output in Panel

![output](./debug-console.png)

# How to Test React Hooks

```ts
  const setState = jest.fn();
  const useStateMock = (initState) => [initState, setState];
  jest.spyOn(React, 'useState').mockImplementation(useStateMock);
  
  expect(setState).toHaveBeenCalledWith(true);
```

# Git rebase

https://git-scm.com/book/en/v2/Git-Branching-Rebasing

https://git-scm.com/docs/git-rebase

![origin git log](https://git-scm.com/book/en/v2/images/interesting-rebase-1.png)

```sh
$ git rebase --onto master server client
```

![result git log](https://git-scm.com/book/en/v2/images/interesting-rebase-2.png)

# Remove a file from Git commit

1. `GitLens => File History`, right click the target commit hash you wanna restore, select `Restore`. Check the result to make sure it is intending one.
2. `git restore <FILE>`, retore it from stages.
3. `git add .`, add the changes to stages.
4. `git commit --amend --no-edit`, amend the last commit without changing the commit message.

**Reason**

The actions from both GitLens `Restore` and Git `git restore` recover the unexpected changes to the original commit. `git add . && git commit --amend` will add the desired files to commit again, without the unexpedted ones.

# Make `yarn golbal add` works

If Yarn is installed with `npm install -g yarn`, it's `bin` will not be added to Windows Environment Variables by default. 

It makes the following error cause:

> 'parcel' is not recognized as an internal or external command, operable program or batch file.

**Howtos**

1. `yarn global bin` to retrieve yarn global binary bin, and copy the output
2. Add the path to Windows Environment Variables

![Windows Environment Variables](https://sung.codes/static/6497ba0af17bd4358d74107bf35b7650/53d09/system-properties-environment-variable-button.jpg)


# React HOC Test

```ts
// "export" one more time for unit test, beside "export default"
export const UserProfile = ({ navigation, userFirstName }) => (

// ...

export default inject(({ globalStoreV2: { userInfo } }) => ({
  userFirstName: userInfo.firstName,
}))(observer(UserProfile));
```
