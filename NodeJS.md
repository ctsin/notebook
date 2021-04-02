The two equivalent method for async in JavaScript

```ts
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

```ts
(async () => {
  var dir = '.';
  if (process.argv[2]) dir = process.argv[2];
  const files = await fs.readdir(dir);
  for (let fn of files) {
    console.log(fn);
  }
})().catch 👈 (err => { console.error(err); });
```