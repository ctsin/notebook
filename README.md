# ContextAPI Initiative in twilio-video-app-react

```ts
export const VideoContext = createContext<IVideoContext>(null!); // without 'as'
```

# React native tool port

![react native port configration](./native-port.png)

# Array.prototype.slice

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

The `slice()` method returns a **shallow copy** of a portion of an array into a **new array object** selected from begin to end (end not included) where begin and end represent the index of items in that array. The original array will not be modified.

# Debug practices

- 对于时间、id等可能为字符串或数值类型的情况，做强转防御。
- 适度抛错，便于QA排查。

# How to Update Angular

```bash
ng update @angular/cli @angular/core
```

# 可观察对象的退订

在 Angular 中，`HttpModule` 或 Rxjs `ajax` 方法不需要退订。因为这方法在请求完成后，会自动触发可观察对象的 `complete` 状态。

**思路**

以 [`flatMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) 为引导，以理解“高阶可观察者”对象.

# Disabled type check temporarily

https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html

With the following comments: `// @ts-nocheck`, `// @ts-check`, and `// @ts-ignore`.

**Heads up:** if you have a `tsconfig.json`, JS checking will respect strict flags like `noImplicitAny`, `strictNullChecks`, etc.

# DOM 事件的行内回调形式
行内回调的语句可以拿到 `event` 对象: 

```html
<input onkeyup="peopleStore[1].name = event.target.value" />
```

# Prettier End of Line 

https://prettier.io/docs/en/options.html#end-of-line

```sh
# .prettierrc
{ "endOfLine": "auto" }
```

# Safe area to display in Expo

https://docs.expo.io/versions/latest/sdk/safe-area-context/

```sh
expo install react-native-safe-area-context
```

```ts
import { SafeAreaView } from 'react-native-safe-area-context';

function SomeComponent() {
  return (
    <SafeAreaView>
      <View />
    </SafeAreaView>
  );
}
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

**Howto**

1. `yarn global bin` to retrieve yarn global binary bin, and copy the output
2. Add the path to Windows Environment Variables

![Windows Environment Variables](https://sung.codes/static/6497ba0af17bd4358d74107bf35b7650/53d09/system-properties-environment-variable-button.jpg)

# `clamp()` function in CSS

https://developer.mozilla.org/en-US/docs/Web/CSS/clamp

https://caniuse.com/css-math-functions

**How to use**

- Choose a minimum value: E.g. 16px
- Choose a maximum value: E.g. 34px
- Choose a flexible value: E.g. 5vw

```css
h1 {
  font-size: clamp(16px, 5vw, 34px);
}
```

![clamp()](https://res.cloudinary.com/practicaldev/image/fetch/s--KFPlk1Jn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/0fe8zr0bmhl90wk1r0tg.gif)

# How Array sort works in JavaScript

```ts
const arr = [1, 5, 2, 7, 0];

const result = arr.sort((a, b) => b - a) // [ 7, 5, 2, 1, 0 ]
```

(a = 1 b = 5) 2⏳ 7 0 👉 [5, 1, 2, 7, 0]

5 (a = 1 b = 2) 7⏳ 0 👉 [5, 2, 1, 7, 0]

(a = 5 b = 2) 1 7⏳ 0 👉 [5, 2, 1, 7, 0]

5 2 (a = 1 b = 7) 0⏳ 👉 [5, 2, 7, 1, 0]

5 (a = 2 b = 7) 1 0⏳ 👉 [5, 7, 2, 1, 0]

(a = 5 b = 7) 2 1 0⏳ 👉 [7, 5, 2, 1, 0]

7 5 2 (a = 1 b = 0)🏁 👉 [7, 5, 2, 1, 0]

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort


# How to await for multiple results in parallel

https://gist.run/?id=da57950803bf00ce555752da6bd7147e&mc_cid=5fa9352dcf&mc_eid=afaf576ce2

```ts
Promise.all([asyncFunc1(), asyncFunc2()]).then((results) => {
  console.log(results);
});

// OR

const [result1, result2] = await Promise.all([asyncFunc1(), asyncFunc2()]);
```

# Set `const` variable as `readonly`

```ts
const arr = [1, 5, 2, 7, 0] as const 👈;

// Property 'sort' does not exist on type 'readonly [1, 5, 2, 7, 0]'.(2339)
const result = arr.sort((a, b) => b - a)
```

# Catch error in `async / await`

```ts
const fn = async () => {
  throw new Error('Error Happened')
}

fn().catch(err => {
  console.table(err)
  
})
```

# Make sure property exist

```ts
export class X {
    id! 👈: string; // JavaScript will not complain: "property id do not exist"

    constructor(public age: number = 0) {
    }
}
```

# Initiate `tsconfig.json`

```sh
npx tsconfig.json
```

# Unit test resources

**Library**
https://callstack.github.io/react-native-testing-library/docs/api

**Test case**

https://github.com/callstack/react-native-testing-library/tree/master/src/__tests__

https://callstack.github.io/react-native-testing-library/docs/react-navigation

https://callstack.github.io/react-native-testing-library/docs/redux-integration

https://github.com/twilio/twilio-video-app-react


# Testing React components that update asynchronously with React Testing Library

https://www.30secondsofcode.org/blog/s/testing-async-react-components

**Recap**
- A message about code that causes React state updates not being wrapped in `act(...)` might indicate that **a component updated after the test ended**.
- Using `waitFor()` can solve the issue by making tests asynchronous, but you might need to bump your react-testing-library version if you are using older versions of react-scripts.
- If you see errors related to `MutationObserver`, you might need to change your test script to include `--env=jsdom-fourteen` as a parameter.

# Avoid unnecessary function invoking

```ts
const [updating, setUpdating] = useState(false);

const onRefresh = useCallback(() => {
    setUpdating(true);
    getLatestBalance(nouAccountId).then((res) => {
      setUpdating(false);
    });
  }, [updating]);
```

# Multifolder in VS Code

VS Code workspace definition file can define multifolder, which will lead multifolder options while accessing `Jest Stop` and setting settings.

# `npm list -g`

List all NPM packages installed globaly.

# Styled-Components issue in React Native

https://github.com/styled-components/styled-components/issues/1858#issuecomment-408409443

- `border-bottom` - yes, but you have to write all styles separately, like border-bottom-width, border-bottom-color, when just border can be written as border: 1px solid #000.
- `box-shadow` - yes, but again, you have to write all styles separately like mentioned here.
  Also these would work:
  ```scss
  box-shadow: 2px 4px 12px red;
  boxShadow: 2px 4px 12px red;
  ```
  These would not work (neither with rgb):
  ```scss
  box-shadow: 2px 4px 12px rgba(202, 202, 214, 0.25);
  boxShadow: 2px 4px 12px rgba(202, 202, 214, 0.25);
  ```
  
# Highlight Git diff in Markdown
 
https://blog.alispit.tel/create-a-git-diff-in-markdown/
 
```ts
```diff 👈 use "diff" as language indicator
 function addTwoNumbers (num1, num2) {
-  return 1 + 2
+  return num1 + num2
}
```
 
