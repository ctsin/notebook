https://firebase.google.com/docs/firestore/data-model?authuser=0#collections

> You do not need to "create" or "delete" collections. After you create the first document in a collection, the collection exists. If you delete all of the documents in a collection, it no longer exists.

https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0#add_a_document

> When you use set() to create a document, you must specify an ID for the document to create.
> But sometimes there isn't a meaningful ID for the document, and it's more convenient to let Cloud Firestore auto-generate an ID for you. You can do this by calling add().

> Important: Unlike "push IDs" in the Firebase Realtime Database, Cloud Firestore auto-generated IDs do not provide any automatic ordering. If you want to be able to order your documents by creation date, you should store a timestamp as a field in the documents.

https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0#server_timestamp

> You can set a field in your document to a server timestamp which tracks when the server receives the update.

```ts
import { updateDoc, serverTimestamp } from "firebase/firestore";

const docRef = doc(db, 'objects', 'some-id');

// Update the timestamp field with the value from the server
const updateTimestamp = await updateDoc(docRef, {
    timestamp: serverTimestamp()
});
```

https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0#increment_a_numeric_value

```ts
import { doc, updateDoc, increment } from "firebase/firestore";

const washingtonRef = doc(db, "cities", "DC");

// Atomically increment the population of the city by 50.
await updateDoc(washingtonRef, {
    population: increment(50)
});
```