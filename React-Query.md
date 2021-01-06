# React Query 3

- 在 V3 版本中 `<QueryClientProvider client={queryClient}>` 要比使用 `useQuery` 组件更父一级的组件中，否则 `No QueryClient set, use QueryClientProvider to set one`.
- 导致 Android 的一个问题：
  
  Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.https://github.com/tannerlinsley/react-query/issues/1259
  
  It’s a React Native issue
  
  https://github.com/facebook/react-native/issues/12981#issuecomment-652745831s
  
  How to resolve:
  
  ```ts 
  LogBox.ignoreLogs(['Setting a timer']);
  ```
