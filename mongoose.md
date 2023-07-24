### Mongoose guide from MongoDB

https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/

#### Setup

module type will allow us to use top-level `await`

```json
"scripts": {
  "dev": "nodemon index.js"
},
"type": "module",
```

#### Two ways to create an User

#### With `save()`
`await new User({name: "Foo}).save()`

#### With `create()`
`const user = await User.create({name: "Foo"})`

This method is much better! Not only can we insert our document, but we also get returned the document along with its `_id` when we console log it.

```ts
const article = await Blog.create({
  title: 'Awesome Post!',
});

console.log(article);
```

#### Update User

```js
const user = await User.create({name: "Foo"})

user.name = "Bar";

await user.save()
```

#### Finding data

```ts
const article = await Blog.findById("62472b6ce09e8b77266d6b1b").exec();
console.log(article);
```

Notice that we use the `exec()` Mongoose function. This is technically optional and returns a promise. In my experience, it’s better to use this function since it will prevent some head-scratching issues. If you want to read more about it, check out this note in the Mongoose docs about [promises](https://mongoosejs.com/docs/promises.html).

#### Projecting document fields

Just like with the standard MongoDB Node.js driver, we can project only the fields that we need. Let’s only get the `title`, `slug`, and `content` fields.

```ts
const article = await Blog.findById("62472b6ce09e8b77266d6b1b", "title slug content").exec();

console.log(article);
```

#### Automatic type inference

https://mongoosejs.com/docs/typescript/schemas.html#automatic-type-inference

There are a few caveats for using automatic type inference:

- You need to set `strictNullChecks: true` or `strict: true` in your tsconfig.json. Or, if you're setting flags at the command line, `--strictNullChecks` or `--strict`. There are known issues with automatic type inference with strict mode disabled.
- You need to define your schema in the `new Schema()` call. Don't assign your schema definition to a temporary variable. Doing something like `const schemaDefinition = { name: String }; const schema = new Schema(schemaDefinition);` will not work.
- Mongoose adds `createdAt` and `updatedAt` to your schema if you specify the `timestamps` option in your schema, except if you also specify `methods`, `virtuals`, or `statics`. There is a known issue with type inference with timestamps and methods/virtuals/statics options. If you use methods, virtuals, and statics, you're responsible for adding `createdAt` and `updatedAt` to your schema definition.

If automatic type inference doesn't work for you, you can always fall back to document interface definitions.