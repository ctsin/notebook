https://callstack.github.io/react-native-testing-library/docs/react-navigation

# React Navigation

**Setting up**

```sh
$ yarn add @react-native-community/masked-view @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens
```

**Setting up the test environment**

Install required dev dependencies:
```sh
$ yarn add -D jest @testing-library/react-native
```

Create your jest.config.js file (or place the following properties in your package.json as a "jest" property)

```ts
module.exports = {
  preset: 'react-native',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation)',
  ],
};
```

Notice the 2 entries that don't come with the default React Native project:
- `setupFiles` – an array of files that Jest is going to execute before running your tests. In this case, we run `react-native-gesture-handler/jestSetup.js` which sets up necessary mocks for `react-native-gesture-handler` native module
- `transformIgnorePatterns` – an array of paths that Jest ignores when transforming code. In this case, the negative lookahead regular expression is used, to tell Jest to transform (with Babel) every package inside `node_modules/` that starts with `react-native`, `@react-native-community` or `@react-navigation` (added by us, the rest is in `react-native` preset by default, so you don't have to worry about it).

# Addition

[Redux Integration Expamle](https://callstack.github.io/react-native-testing-library/docs/redux-integration)
