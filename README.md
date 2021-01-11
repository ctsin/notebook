# Styled-Components features not support in React Native

- Note that the `flex` property works like CSS shorthand, and not the legacy `flex` property in React Native. Setting `flex: 1` sets `flexShrink` to `1` in addition to setting `flexGrow` to `1` and `flexBasis` to `0`.
- cannot use the `keyframes` and `createGlobalStyle` helpers since React Native doesn't support `keyframes` or `global` styles.
- You will be warned if you use media queries or nest your CSS.

# A code style

```ts
export const renderReactions = (
  reactions,
  supportedReactions,
  reactionCounts,
  handleReaction,
) => {
  const reactionsByType = {}; // 👈  a store
  reactions &&
    reactions.forEach(item => {
      if (reactions[item.type] === undefined) {
        return (reactionsByType[item.type] = [item]);
      } else {
        // 👇 update store and return it.
        return (reactionsByType[item.type] = [
          ...reactionsByType[item.type],
          item,
        ]);
      }
    });

  const emojiDataByType = {};
  supportedReactions.forEach(e => (emojiDataByType[e.id] = e));

  const reactionTypes = supportedReactions.map(e => e.id);

  // 👇 map the store to view
  return Object.keys(reactionsByType).map((type, index) =>
    reactionTypes.indexOf(type) > -1 ? (
      <ReactionItem
        key={index}
        type={type}
        handleReaction={handleReaction}
        reactionCounts={reactionCounts}
        emojiDataByType={emojiDataByType}
      />
    ) : null,
  );
};
```

# How to use fonts in ReactNative

https://dev.to/vishalnarkhede/tutorial-how-to-build-a-slack-clone-with-react-native-part-1-37kn

- create `react-native.config.js` in root of project.

  ```ts
  module.exports = {
    assets: ['./assets/fonts/'],
  };
  ```
- place font files in the folder above.
- run `npx react-native link`.
- apply font in style

  ```ts
  const styles = StyleSheet.create({
    title: {
      fontFamily: 'Lato-Regular',
    },
  });
  ```

# non-null assertion operator (the postfix ! character).

# Fix issues on iOS simulator

## Reset simulator

https://stackoverflow.com/questions/51147704/expo-error-installing-or-running-app

1️⃣ **From shell**

```sh
xcrun simctl erase all
```

2️⃣ **From Simulator menu**

Simulator -> `Device` -> `Erase All Contents and Settings`.

## Activate keyboard

- Simulator -> 'I/O' -> `Keyboard` -> `Connect Hardware Keyboard`, or <kbd>⌘+Shift+K</kbd>

# How to access dot file or folder in MacOS

- <kbd>shift</kbd> + <kbd>cmd</kbd> + <kbd>G</kbd> to go to the dot file or folder.
- Use Spotlight

# Fish shell

**Set Fish as default shell in VS Code**

https://stackoverflow.com/questions/60174054/how-does-visual-studio-code-vscode-know-environment-variables-set-in-config

**autosuggestion**

https://fishshell.com/docs/current/index.html#autosuggestions

To accept the autosuggestion (replacing the command line contents), press right arrow or Control+F. To accept the first suggested word, press Alt+→,Right or Alt+F. If the autosuggestion is not what you want, just ignore it: it won't execute unless you accept it.

-    Tab completes the current token. Shift, Tab completes the current token and starts the pager's search mode.
-   Alt+←,Left and Alt+→,Right move the cursor one word left or right (to the next space or punctuation mark), or moves forward/backward in the directory history if the command line is empty. If the cursor is already at the end of the line, and an autosuggestion is available, Alt+→,Right (or Alt+F) accepts the first word in the suggestion.
-    Shift,←,Left and Shift,→,Right move the cursor one word left or right, without stopping on punctuation.
-   ↑ (Up) and ↓ (Down) (or Control+P and Control+N for emacs aficionados) search the command history for the previous/next command containing the string that was specified on the commandline before the search was started. If the commandline was empty when the search started, all commands match. See the history section for more information on history searching.
-   Alt+↑,Up and Alt+↓,Down search the command history for the previous/next token containing the token under the cursor before the search was started. If the commandline was not on a token when the search started, all tokens match. See the history section for more information on history searching.
-   Control+C cancels the entire line.
-   Control+D delete one character to the right of the cursor. If the command line is empty, Control+D will exit fish.
-   Control+U moves contents from the beginning of line to the cursor to the killring.
-   Control+L clears and repaints the screen.
-   Control+W moves the previous path component (everything up to the previous "/", ":" or "@") to the killring.
-   Control+X copies the current buffer to the system's clipboard, Control+V inserts the clipboard contents.
-   Alt+d moves the next word to the killring.
-   Alt+h (or F1) shows the manual page for the current command, if one exists.
-   Alt+l lists the contents of the current directory, unless the cursor is over a directory argument, in which case the contents of that directory will be listed.
-   Alt+p adds the string '| less;' to the end of the job under the cursor. The result is that the output of the command will be paged.
-   Alt+w prints a short description of the command under the cursor.
-   Alt+e edit the current command line in an external editor. The editor is chosen from the first available of the $VISUAL or $EDITOR variables.
-   Alt+v Same as Alt+e.
-   Alt+s Prepends sudo to the current commandline.

# Cold boot virtual android device in Android Studio

# Use 'open' command to open a file with its default browser.

# How to dark mode

Toggle class name to `.lightMode`to fire light mode.

```scss
// by default dark theme

:root {
    --bg-color: #171923;
    --bg-light: #232535;
    --font-color: #c5cddb;
    --font-light: #ffffff;
}

// light theme colors

.lightMode {
  --bg-color: #E8E6DC;
  --bg-light: #DCDACA;
  --font-color: #3D3D3D;
  --font-light: #202020;
}
```

# `package.json`version

- `˜` for patch version. `16.3.x` ✔, but `16.4.0` ❌
- `ˆ`for minor version. `16.x.x` ✔️, but `17.0.0` ❌

https://dev.to/laurieontech/the-anatomy-of-package-json-pi4?utm_source=digest_mailer&utm_medium=email&utm_campaign=digest_email

# Create React App with TypeScript issue

CRA v4 DO NOT support set `path` section in `tsconfig.json`, which can set path alias in 'import' statement. (validated on Dec 2020) https://www.typescriptlang.org/tsconfig#paths

# How to rename Git branch

Learned from GitHub's repository initial tips: `git branch -M main`.

# Add environment variables to CodeSandbox

- Fock from https://codesandbox.io/s/node-http-server-node
- Add variable from `Server Control Panel`. https://codesandbox.io/docs/secrets

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
 
