# `isEmpty` in Lodash

```js
console.log("[0]", _.isEmpty(0)); // true as no `length` props
console.log("[1]", _.isEmpty(1)); // true as no `length` props
console.log("[String]", _.isEmpty("Foo")); // false
console.log("[Empty string]", _.isEmpty("")); // true
console.log("True", _.isEmpty(true)); // true
console.log("False", _.isEmpty(false)); // true
console.log("Undefined", _.isEmpty(undefined)); // true
console.log("Null", _.isEmpty(null)); // true
console.log("[]", _.isEmpty([])); // true
console.log(
  "Fn",
  _.isEmpty(() => undefined)
); // true
```

# Mock module if it is re-exported from `index`

This statement need to be re-considered as ChatGPT offer an opposite answer.

> ChatGPT: For Jest to correctly mock the module, the path to the module in jest.mock() must match exactly with the import statement where the module is used. This is because Jest replaces the actual import in your file with the mock, so it needs to know the exact location of the import. Therefore, it's important to ensure the path used in the Jest mock matches the actual import path.
> If in your component to be tested (Name.js), you are importing like import {getName} from '../../utils/getName'; then you need to mock it the exact same way jest.mock('../../utils/getName').

If you instead mock it like jest.mock('../../utils') but import it in component to be tested from '../../utils/getName', the mock will not work because Jest could not find a match for the import and the mock.

The import statement and the jest.mock statement should be exactly same. Matching the import path is important for Jest to correctly inject your mocked module into your test.

**Conclusion**: mark4 and mark 5 need to be exactly same with mark 1. No more no less.

```js
// src/components/Name.js
import {getName} from '../../utils/getName'; // mark 1
getName();
```

When I test 'Name' component, which statement will works?

1. 
```js
// NOT WORKs
import {getName} from '../../utils'; // mark 2
jest.mock('../../utils') // mark 3
```

2. 

```js
// WORKs
import {getName} from '../../utils/getName'; // mark 4
jest.mock('../../utils/getName') // mark 5
```

```js
// src/util/Dummy.ts
export const Dummy = () => {};

// src/util/index.ts
export {Dummy} from "./Dummy";

// src/Components/Host.ts
import {Dummy} from "./src/util";

// src/Components/Host.spec.ts
import {Dummy} "./src/util";

// jest.mock can access final code, even though it is used from `index`
jest.mock("./src/util/Dummy");
const mockDummy = Dummy as jest.mock;

mockDummy.mockReturnValue({});
```

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
