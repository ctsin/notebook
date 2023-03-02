# [Test Structure](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Test-Structure)

`context()` is identical to `describe()` and `specify()` is identical to `it()`.

# Shortcuts

```ts
  cy.get('[data-test=new-todo]').type(`${newItem}{enter}`);
  cy.contains('Pay electric bill').should('not.exist');
```

# IDE Integration

Triple slash directives

https://docs.cypress.io/guides/tooling/IDE-integration#Triple-slash-directives

```ts
/// <reference types="cypress" />
```

Or setting in `tsconfig.json`: 

https://docs.cypress.io/guides/tooling/IDE-integration#Reference-type-declarations-via-tsconfig

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress"] 
  },
  "include": ["**/*.ts"]
}
```

# cy.contains

```ts
// a better way to check element's text content against a regular expression
// is to use "cy.contains"
// https://on.cypress.io/contains
cy.get('.assertion-table')
  .find('tbody tr:last') // ":last" => sugar 
  // finds first <td> element with text content matching regular expression
  .contains('td', /column content/i)
  .should('be.visible')
```

# network_requests.spec.js

```ts
it('cy.request() - pass result to the second request', () => {
  // first, let's find out the userId of the first user we have
  cy.request('https://jsonplaceholder.cypress.io/users?_limit=1')
    .its('body') // ⚠️ yields the response object
    .its('0') // ⚠️ yields the first element of the returned list
    // ⚠️ the above two commands its('body').its('0')
    // ⚠️ can be written as its('body.0')
    // ⚠️ if you do not care about TypeScript checks
    .then((user) => {
      expect(user).property('id').to.be.a('number')
      // make a new post on behalf of the user
      cy.request('POST', 'https://jsonplaceholder.cypress.io/posts', {
        userId: user.id,
        title: 'Cypress Test Runner',
        body: 'Fast, easy and reliable testing for anything that runs in a browser.',
      })
    })
    // ⚠️ note that the value here is the returned value of the 2nd request
    // ⚠️ which is the new post object
    .then((response) => {
      expect(response).property('status').to.equal(201) // new entity created
      expect(response).property('body').to.contain({
        title: 'Cypress Test Runner',
      })

      // we don't know the exact post id - only that it will be > 100
      // since JSONPlaceholder has built-in 100 posts
      expect(response.body).property('id').to.be.a('number')
        .and.to.be.gt(100)

      // we don't know the user id here - since it was in above closure
      // so in this test just confirm that the property is there
      expect(response.body).property('userId').to.be.a('number')
    })
})
```

```ts
it('cy.request() - save response in the shared test context', () => {
  // https://on.cypress.io/variables-and-aliases
  cy.request('https://jsonplaceholder.cypress.io/users?_limit=1')
    .its('body').its('0') // yields the first element of the returned list
    .as('user') // saves the object in the test context
    .then(function () {
      //  ⚠️ NOTE 👀
      //  By the time this callback runs the "as('user')" command
      //  has saved the user object in the test context.
      //  To access the test context we need to use
      //  the "function () { ... }" callback form,
      //  otherwise "this" points at a wrong or undefined object!
      cy.request('POST', 'https://jsonplaceholder.cypress.io/posts', {
        userId: this.user.id,
        title: 'Cypress Test Runner',
        body: 'Fast, easy and reliable testing for anything that runs in a browser.',
      })
      .its('body').as('post') // save the new post from the response
    })
    .then(function () {
      // ⚠️ When this callback runs, both "cy.request" API commands have finished
      // and the test context has "user" and "post" objects set.
      // Let's verify them.
      expect(this.post, 'post has the right user id').property('userId').to.equal(this.user.id)
    })
})
```