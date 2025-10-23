# plain text in Enum of TypeScript

> The answer is offered by Google Gemini

```js
export enum CtaLinkTypes {
  INTERNAL = "internal",
  EXTERNAL = "external",
  NONE = "none",
}

  // Type "internal" is not assignable to type 'CtaLinkTypes'.ts(2322)
const mockCards: TSpecificFaq = {
  ctaLink: { linkType: "internal", link: "/ttfaq", openInNewTab: false },
}
```

The error message "Type '"internal"' is not assignable to type 'CtaLinkTypes'" tells us that you're trying to assign the string "internal" to a variable or property that expects a different type, specifically a type called CtaLinkTypes.

`CtaLinkTypes` is an enum, you'll need to use the enum value instead of the string:

```js
const ctaLink = { linkType: CtaLinkTypes.Internal /* 💯 */, link: "/ttfaq", openInNewTab: false };
```

# Mock module if it is re-exported from `index`

```js
// src/util/Dummy.ts
export const Dummy = () => {};

// src/util/index.ts
export {Dummy} from "./Dummy";

// src/Components/Host.ts
// Unit Test mock does NOT care what kind of pattern to import
import {Dummy} from "./src/util";
import {Dummy} from "./src/util/Dummy";

// src/Components/Host.spec.ts
// Works 🚀 Same pattern to import
import {Dummy} "./src/util";
jest.mock("./src/util");

// Works 🚀 Same pattern to import
import {Dummy} "./src/util/Dummy";
jest.mock("./src/util/Dummy");

// Fails 🚨 different pattern to import
import {Dummy} "./src/util";
jest.mock("./src/util/Dummy");

// Fails 🚨 different pattern to import
import {Dummy} "./src/util/Dummy";
jest.mock("./src/util");

const mockDummy = Dummy as jest.mock;
mockDummy.mockReturnValue({});
```

**Another example**

```js
import { mocked } from "jest-mock";
import { Greeting } from "../../src/UI/Greeting";
import { getGreeting } from "../../src/utils/getGreeting";

jest.mock("../../src/utils/getGreeting");

describe("Greeting", () => {
  it("should return greeting message", () => {
    // both two mock methods work
    mocked(getGreeting).mockReturnValue("Hej, Tsing!");
    getGreeting.mockReturnValue("Hej, Tsing!");

    expect(Greeting()).toBe("Hej, Tsing!");
  });
});
```

## Conclusion

In unit test file, the `jest.mock` doesn't care how the modules are used in the implementation(`/Components/Host.ts`). It should follow exactly with the `import` statement of target modules. No more, no less.

# Solve the Enzyme config issue in codesandbox.io

**Issue**

```bash
Enzyme Internal Error: Enzyme expects an adapter to be configured, but found none.
```

**Fix** ([Source](https://codesandbox.io/s/determined-chaplygin-8jt5f?file=/src/components/__tests__/RemotePizza_di.spec.js))

```js
// This line is only needed for CodeSandbox
import "../../../src/setupTests.js";
```

# How to Test React Hooks

```js
const setState = jest.fn();
const useStateMock = (initState) => [initState, setState];
jest.spyOn(React, "useState").mockImplementation(useStateMock);

expect(setState).toHaveBeenCalledWith(true);
```

# React HOC Test

```js
// "export" one more time for unit test, beside "export default"
export const UserProfile = ({ navigation, userFirstName }) => (

// ...

export default inject(({ globalStoreV2: { userInfo } }) => ({
  userFirstName: userInfo.firstName,
}))(observer(UserProfile));
```

# Test asynchronous fn in FC

```js
export const Footer = ({
  globalStoreV2: { getUserInfo, userInfo: { phone } },
}) => {
  // A asynchronous fn
  const handleOnPress = async👈 () => {
    getUserInfo(phone);
  };

  return (
    <View>
      <FormButton
        onPress={handleOnPress}
      />
    </View>
  );
};

// unit test
const defaultProps = {
  globalStoreV2: { getUserInfo: jest.fn(), userInfo: { phone: '12345678' } },
};

describe('<Footer />', () => {
  it('handleOnPress()', async👈 () => {
    const wrapper = shallow(<Footer {...defaultProps} />);
    const { phone } = defaultProps.globalStoreV2.userInfo;
    const formButton = wrapper.find(FormButton);

    await👈 formButton.props().onPress();

    expect(
      defaultProps.globalStoreV2.getUserInfo,
    ).toHaveBeenCalledWith(
      phone,
    );
  });
});

```

# Test Hooks

```js
import * as redux from "react-redux";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "./",
    state: {
      /* state object */
    },
  }),
}));

describe("", () => {
  const spyOnUseSelector = jest.spyOn(redux, "useSelector");

  it("", () => {
    spyOnSelector.mockReturnValue({
      /* mock value */
    });

    const result = render(<SomeComponent />);
    expect(result).toBe();
  });
});
```

# Mock `ReactNativeKeychain`

```js
import * as ReactNativeKeychain from 'react-native-keychain';
import {save, load, reset} from '../../../src/utils/keychain/index';

const mockKeychain = ReactNativeKeychain as jest.Mocked<typeof ReactNativeKeychain>;

describe('Keychain Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('save', () => {
    it('should save credentials when username is provided', async () => {
      mockKeychain.setInternetCredentials.mockResolvedValue(undefined);

      const result = await save('testUser', 'testPass', 'testData');

      expect(mockKeychain.setInternetCredentials).toHaveBeenCalledWith('testUser', 'testData', 'testPass');
      expect(result).toBe(true);
    });
  });
})
```

# jest.mock() 工作原理深度解析

jest.mock() 是 Jest 测试框架中一个非常核心且强大的功能。可以形象地理解为，它在代码运行时“劫持”了模块的加载过程，从而实现对依赖的控制。

## jest.mock() 的核心作用

jest.mock(moduleName) 的主要作用是用一个“模拟版本”（mock version）来替换一个真实的模块（module）。

当你像这样写：

```typescript
// 使用模块路径（可以是相对路径或别名路径）
jest.mock('../utils/api-client');
jest.mock('@/utils/auth');
```

Jest 测试框架会在背后做几件关键的事情：

1. 自动模拟（Auto-mocking）：Jest 会找到你指定的模块，并自动地将它导出的所有函数（例如 fetchData, getUserInfo 等）都替换成 Jest 的模拟函数（mock function），也就是 jest.fn()。
2. 空实现：这些自动生成的模拟函数默认是“空的”。它们被调用时不会执行任何原始逻辑，只会返回 undefined。
3. 追踪调用：最重要的一点是，这些模拟函数会记录下所有对它们的调用信息，比如被调用了多少次、每次调用的参数是什么。这使得你可以在测试中断言（assert）“某个函数是否被以正确的参数调用了”。
4. 提供控制能力：你可以完全控制这些模拟函数的行为。比如，在特定测试中让它返回一个指定的值（使用 .mockReturnValue()）或者一个指定的实现（使用 .mockImplementation()）。

## 为什么 jest.mock() 要放在文件顶部？

这是理解 jest.mock() 工作方式最关键的一点。

Jest 会自动将 jest.mock() 调用提升（hoist）到模块的顶部，在所有 import 语句执行之前运行。

让我们来看一下一个典型测试文件的执行流程：

1. 提升 (Hoisting)：Jest 扫描整个测试文件，发现所有的 jest.mock(...) 调用。它会把这些调用“提到”最前面去优先执行。
2. 模块替换：在这个阶段，Jest 就在其内部的模块注册表中，将被 mock 的模块（如 '../utils/api-client') 的真实路径替换为一个指向“模拟版本”的引用。
3. 执行 import：接下来，代码中的 import 语句开始执行。
    * 当执行 import * as apiClient from '../utils/api-client'; 时，因为上一步已经做了替换，所以 apiClient 这个变量拿到的不是真实的模块，而是 Jest 创建的那个包含了所有模拟函数的“模拟版本”。
    * 同样，当执行 import { processUserData } from './userService'; 时，如果 userService.ts 文件内部也 import 了 '../utils/api-client'，由于 Jest 的模块系统已经被“劫持”，processUserData 函数内部拿到的 apiClient 同样是那个“模拟版本”。

这个机制确保了无论在测试代码中还是在被测试的代码中，任何对该模块的引用都会得到模拟版本，而不是真实版本。

## 这样做的好处是什么？

这种机制是单元测试（Unit Testing）的核心思想——隔离（Isolation）。

假设你想测试 processUserData 函数的逻辑是否正确，而这个函数依赖于 apiClient 来从服务器获取数据。如果直接使用真实的 apiClient，你的测试就会和网络请求、后端服务等外部因素耦合在一起，这会带来几个问题：

* 不可预测：网络可能不稳定，后端服务可能宕机，导致测试结果时好时坏。
* 测试范围过大：processUserData 的测试失败了，你无法确定是它自己的逻辑错了，还是 apiClient 或后端服务出了问题。
* 难以覆盖所有场景：真实的 API 可能只会返回几种固定的数据。但通过 mock，你可以轻松地模拟任何你想要的返回值（如成功数据、空数据、错误信息、null 等），从而测试 processUserData 在所有分支下的行为是否都符合预期。

通过 jest.mock()，你可以将被测试的函数从它的依赖中隔离开，然后像下面这样精确地控制依赖的行为，只专注于测试函数本身的逻辑：

```typescript
// 导入被 mock 后的模块
import * as apiClient from '../utils/api-client';
// 导入要测试的函数
import { processUserData } from './userService';

// 类型转换，让 TypeScript 知道这是个 mock 对象，提供类型提示
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('processUserData', () => {
  it('should process user data correctly on successful API call', () => {
    // 1. 准备：控制 mock 函数的行为
    // 假设我们希望 apiClient.fetchData 返回一个特定的用户对象
    const mockUser = { id: 1, name: 'John Doe' };
    mockedApiClient.fetchData.mockResolvedValue(mockUser);

    // 2. 执行：调用被测试的函数
    const result = await processUserData(1);

    // 3. 断言：验证结果是否符合预期
    expect(result).toEqual({ userId: 1, displayName: 'JOHN DOE' });
    // 并且可以验证 mock 函数是否被正确调用
    expect(mockedApiClient.fetchData).toHaveBeenCalledWith(1);
    expect(mockedApiClient.fetchData).toHaveBeenCalledTimes(1);
  });
});
```
## 总结

jest.mock() 是一个强大的工具，它通过在模块加载时进行“劫持”，用一个可控、可追踪的模拟版本替换掉真实的模块。这使得我们可以编写出隔离、稳定、可预测的单元测试。将它放在文件顶部是利用 Jest 的“提升”机制来确保这种替换在任何代码使用到该模块之前就已生效。