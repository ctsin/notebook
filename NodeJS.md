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
