# `isEmpty` in Lodash

```js
console.log('[0]', _.isEmpty(0)); // true as no `length` props
console.log('[1]', _.isEmpty(1)); // true as no `length` props
console.log('[String]', _.isEmpty("Foo")); // false 
console.log('[Empty string]', _.isEmpty("")); // true
console.log('True', _.isEmpty(true)); // true
console.log('False', _.isEmpty(false)); // true
console.log('Undefined', _.isEmpty(undefined)); // true
console.log('Null', _.isEmpty(null)); // true
console.log('[]', _.isEmpty([])); // true
console.log('Fn', _.isEmpty(() => undefined)); // true
```

# Mock module if it is re-exported from `index`

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
   import '../../../src/setupTests.js';
```

# How to Test React Hooks

```js
  const setState = jest.fn();
  const useStateMock = (initState) => [initState, setState];
  jest.spyOn(React, 'useState').mockImplementation(useStateMock);
  
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
import * as redux from "react-redux"

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "./",
    state: {
      /* state object */
    }
  })
}))

describe("", () => {
  const spyOnUseSelector = jest.spyOn(redux, "useSelector");

  it("", () => {
    spyOnSelector.mockReturnValue({/* mock value */});

    const result = render(<SomeComponent />);
    expect(result).toBe()
  })
})
```