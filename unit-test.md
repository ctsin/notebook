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

# How to Test React Hooks

```ts
  const setState = jest.fn();
  const useStateMock = (initState) => [initState, setState];
  jest.spyOn(React, 'useState').mockImplementation(useStateMock);
  
  expect(setState).toHaveBeenCalledWith(true);
```

# React HOC Test

```ts
// "export" one more time for unit test, beside "export default"
export const UserProfile = ({ navigation, userFirstName }) => (

// ...

export default inject(({ globalStoreV2: { userInfo } }) => ({
  userFirstName: userInfo.firstName,
}))(observer(UserProfile));
```

# Test asynchronous fn in FC

```ts
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