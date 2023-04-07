https://www.apollographql.com/tutorials/lift-off-part2/04-implementing-our-restdatasource

Let's define a constructor method inside the class. Inside, we'll call `super()` to make sure we get access to our `RESTDataSource` features. We'll also assign our REST API's base url.

```ts
class TrackAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";
  }
}
```

> Note: Be sure that your TrackAPI class' `baseURL` value ends with a `/`. This will allow our helper class to make requests and append new paths to the `baseURL` without any errors.

---

https://www.apollographql.com/tutorials/lift-off-part2/05-the-shape-of-a-resolver

A resolver is a function. It has the same name as the field that it populates data for. It can fetch data from any data source, then transforms that data into the shape your client requires.

---

https://www.apollographql.com/tutorials/lift-off-part2/08-querying-live-data

The first one took about half a second, then this one returned in just a few milliseconds. This is thanks to our `RESTDataSource`'s built-in resource caching.

---

https://www.apollographql.com/tutorials/lift-off-part2/09-errors-when-queries-go-sideways

There could be multiple errors! ApolloServer provides error codes that will help to narrow down what caused the issues.