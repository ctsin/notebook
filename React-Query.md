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

# Practical React Query

https://tkdodo.eu/blog/practical-react-query

- React Query does not invoke the queryFn on every re-render, even with the default `staleTime` of zero
- `refetchOnWindowFocus` will not trigger a re-render if the data is the same as current cache
- Treat the query key like a dependency array
- Both `keepPreviousData` and `initialData` can be used for pre-fill
- Keep server and client state separate
- The `enabled` option is very [powerful](https://tkdodo.eu/blog/practical-react-query#the-enabled-option-is-very-powerful)
- Inline function will always makes re-render, due to referentially equality.
- `useMemo` & `useCallback` can be used in un-most-top
- use `select` to transform fetch result
- `isFetching` transition will make component re-render twice with value changing from `true` to `false`. [link](https://tkdodo.eu/blog/react-query-render-optimizations#isfetching-transition)
- [notifyOnChangeProps](https://tkdodo.eu/blog/react-query-render-optimizations#notifyonchangeprops): observeing the specific pros only. Observing the props used automatically by setting `notifyOnChangeProps: 'tracked'`. This option is also available in [global config](https://tkdodo.eu/blog/react-query-render-optimizations#tracked-queries). It works with some limitations, object rest destructuring, for instance.
- Set `{retry: false}` while testing
- [Setting a logger](https://tkdodo.eu/blog/testing-react-query#silence-the-error-console) to avoid unnecessary console
- Keep my Query Keys next to their respective queries
- keep your api layer separated from your queries
- Keeping the whole object will keep the context of what data it is or where the error is coming from. With [type narrowing](https://tkdodo.eu/blog/react-query-and-type-script#type-narrowing)
