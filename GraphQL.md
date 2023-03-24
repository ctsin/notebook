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
