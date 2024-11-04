# shortcuts

**iOS**

- `fn + D` to toggle [devtools](https://reactnative.dev/docs/debugging)
- `fn + R` to reload

# React native performance

https://reactnative.dev/docs/performance

- JS frame - JavaScript thread
- UI frame - main thread

Common sources of performance problems

# Running in development mode (dev=true)

A lot more work needs to be done at runtime to provide you with good warnings and error messages, such as validating propTypes and various other assertions.

# Using `console.log` statements

You can also use this babel plugin that removes all the `console.*` calls.

```json
{
  "env": {
    "production": {
      "plugins": ["transform-remove-console"]
    }
  }
}
```

# `ListView` initial rendering is too slow or scroll performance is bad for large lists

Use the new `FlatList` or `SectionList` component instead.

If your `FlatList` is rendering slow, be sure that you've implemented `getItemLayout` to optimize rendering speed by skipping measurement of the rendered items.

# Dropping JS thread FPS because of doing a lot of work on the JavaScript thread at the same time

- set `useNativeDriver: true`
- use `LayoutAnimation`

# Moving a view on the screen (scrolling, translating, rotating) drops UI thread FPS

Enabling `shouldRasterizeIOS` or `renderToHardwareTextureAndroid` can help.

Be careful not to overuse this or your memory usage could go through the roof. Profile your performance and memory usage when using these props.

# Animating the size of an image drops UI thread FPS

Use the transform: [{scale}] style property to animate the size.

# My TouchableX view isn't very responsive

Wrap any action inside of your onPress handler in `requestAnimationFrame`:

```ts
handleOnPress() {
  requestAnimationFrame(() => {
    this.doExpensiveAction();
  });
}
```

# Slow navigator transitions

Use `React Navigation` library. The views in React Navigation use native components and the `Animated` library to deliver 60 FPS animations that are run on the native thread.

# React Native New Architecture by default

https://reactnative.dev/blog/2024/10/23/release-0.76-new-architecture#react-native-new-architecture-by-default

# Box Shadow and Filter style props

https://reactnative.dev/blog/2024/10/23/release-0.76-new-architecture#box-shadow-and-filter-style-props