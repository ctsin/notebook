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

# The key differences between npm ci and npm install:

## npm ci (Clean Install)
- Faster: Designed for automated environments like CI/CD pipelines
- Requires package-lock.json: Won't work without it
- Exact versions: Installs exactly what's in package-lock.json, ignoring package.json version ranges
- Deletes node_modules: Always removes existing node_modules folder first
- Read-only: Never modifies package.json or package-lock.json
- Fails on mismatch: Exits with error if package.json and package-lock.json are out of sync

## npm install
- Flexible: Can work with or without package-lock.json
- Version resolution: Resolves versions based on package.json ranges
- Incremental: Only installs missing packages by default
- Updates lock file: Can modify package-lock.json if needed
- Interactive: Can install new packages when you specify them

## When to use which?
**Use npm ci for:**

- Production deployments
- CI/CD pipelines
- Docker builds
- When you want guaranteed reproducible installs

**Use npm install for:**

- Local development
- Adding new packages (npm install express)
- When package-lock.json doesn't exist yet
- Interactive development workflow

The main takeaway: npm ci is all about speed and reproducibility, while npm install is more flexible for development work.