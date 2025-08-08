The two equivalent method for async in JavaScript

```js
query('SELECT * from db.table') 
.then(result => { 
    // operate on result 
}) 
.catch(err => { 
    // handle errors 
});

try {
    const result = await query('SELECT * from db.table');
    // operate on result
} catch (err) {
    // handle errors
}

```

```js
(async () => {
  var dir = '.';
  if (process.argv[2]) dir = process.argv[2];
  const files = await fs.readdir(dir);
  for (let fn of files) {
    console.log(fn);
  }
})().catch 👈 (err => { console.error(err); });
```

# Modern Node.js Patterns for 2025

https://kashw1n.com/blog/nodejs-2025/

1. Embrace Web Standards: Use node: prefixes, fetch API, AbortController, and Web Streams for better compatibility and reduced dependencies
2. Leverage Built-in Tools: The test runner, watch mode, and environment file support reduce external dependencies and configuration complexity
3. Think in Modern Async Patterns: Top-level await, structured error handling, and async iterators make code more readable and maintainable
4. Use Worker Threads Strategically: For CPU-intensive tasks, worker threads provide true parallelism without blocking the main thread
5. Adopt Progressive Enhancement: Use permission models, diagnostics channels, and performance monitoring to build robust, observable applications
6. Optimize for Developer Experience: Watch mode, built-in testing, and import maps create a more pleasant development workflow
7. Plan for Distribution: Single executable applications and modern packaging make deployment simpler
