https://mobx.js.org/observable-state.html

Converting observables back to vanilla JavaScript collections

Sometimes it is necessary to convert observable data structures back to their vanilla counterparts. For example when passing observable objects to a React component that can't track observables, or to obtain a clone that should not be further mutated.

To convert a collection **shallowly**:

```ts
const plainObject = { ...observableObject }
const plainArray = observableArray.slice()
const plainMap = new Map(observableMap)
```

To convert a data tree recursively: 
- the `toJS` utility. 
- For classes, it is recommend to implement a toJSON() method, as it will be picked up by JSON.stringify.

Collections such as arrays, Maps and Sets are made observable automatically.

`makeAutoObservable` cannot be used on classes that have super or are subclassed.

Observable arrays have some additional nifty utility functions:

- clear() removes all current entries from the array.
- replace(newItems) replaces all existing entries in the array with new ones.
- remove(value) removes a single item by value from the array. Returns true if the item was found and removed.


https://mobx.js.org/actions.html

For debugging purposes, we recommend to either name the wrapped function, or pass a name as the first argument to action.

Note that the flowResult function is only needed when using TypeScript. Since decorating a method with flow, it will wrap the returned generator in a promise. However, TypeScript isn't aware of that transformation, so flowResult will make sure that TypeScript is aware of that type change.

```ts
import { flow } from "mobx"

class Store {
    githubProjects = []
    state = "pending"

    fetchProjects = flow(function* (this: Store) {
        this.githubProjects = []
        this.state = "pending"
        try {
            // yield instead of await.
            const projects = yield fetchGithubProjectsSomehow()
            const filteredProjects = somePreprocessing(projects)
            this.state = "done"
            this.githubProjects = filteredProjects
        } catch (error) {
            this.state = "error"
        }
    })
}

const store = new Store()
const projects = await store.fetchProjects()
```

The upside is that we don't need flowResult anymore, the downside is that this needs to be typed to make sure its type is inferred correctly.

Cancelling flows {🚀}

Another neat benefit of flows is that they are cancellable. The return value of flow is a promise that resolves with the value that is returned from the generator function in the end. The returned promise has an additional cancel() method that will interrupt the running generator and cancel it. Any try / finally clauses will still be run.

https://mobx.js.org/computeds.html

Rules

When using computed values there are a couple of best practices to follow:

- They should not have side effects or update other observables.
- Avoid creating and returning new observables.

Tip: computed values will be suspended if they are not observed

```ts
// OrderLine has a computed property `total`.
const line = new OrderLine(2.0)

// If you access `line.total` outside of a reaction, it is recomputed every time.
setInterval(() => {
    console.log(line.total)
}, 60)
```

MobX can also be configured with the computedRequiresReaction option, to report an error when computeds are accessed outside of a reactive context.

https://mobx.js.org/reactions.html

Always dispose of reactions

```ts
const counter = observable({ count: 0 })

// Sets up the autorun and prints 0.
const disposer = autorun(() => {
    console.log(counter.count)
})

// Prints: 1
counter.count++

// Stops the autorun.
disposer() // 👈

// Will not print.
counter.count++
```

https://mobx.js.org/react-integration.html

You might not need locally observable state

Using observables inside React components adds value as soon as they are either 1) deep, 2) have computed values or 3) are shared with other observer components.

Don't pass observables into components that aren't observer

Components wrapped with observer only subscribe to observables used during their **own** rendering of the component. So if observable objects / arrays / maps are passed to child components, those have to be wrapped with observer as well. This is also true for any callback based components.

If you want to pass observables to a component that isn't an observer, either because it is a third-party component, or because you want to keep that component MobX agnostic, you will have to convert the observables to plain JavaScript values or structures before passing them on.

To elaborate on the above, take the following example observable todo object, a TodoView component (observer) and an imaginary GridRow component that takes a column / value mapping, but which isn't an observer:

```ts
class Todo {
    title = "test"
    done = true

    constructor() {
        makeAutoObservable(this)
    }
}

const TodoView = observer(({ todo }: { todo: Todo }) =>
   // WRONG: GridRow won't pick up changes in todo.title / todo.done
   //        since it isn't an observer.
   return <GridRow data={todo} />

   // CORRECT: let `TodoView` detect relevant changes in `todo`,
   //          and pass plain data down.
   return <GridRow data={{
       title: todo.title,
       done: todo.done
   }} />

   // CORRECT: using `toJS` works as well, but being explicit is typically better.
   return <GridRow data={toJS(todo)} />
)
```

Tip: when combining observer with other higher-order-components, apply observer first

When observer needs to be combined with other decorators or higher-order-components, make sure that observer is the innermost (first applied) decorator; otherwise it might do nothing at all.

```ts
// Effect that triggers upon observable changes.
// Note that we return the disposer created by autorun from our effect function. This is important, since it makes sure the autorun gets cleaned up once the component unmounts! 👍
useEffect(
    () =>
        autorun(() => {
            if (timer.secondsPassed > 60) alert("Still there. It's a minute already?!!")
        }),
    []
)
```

https://mobx.js.org/react-optimizations.html

Use many small components

Render lists in dedicated components

Bad:
```ts
const MyComponent = observer(({ todos, user }) => (
    <div>
        {user.name}
        <ul>
            {todos.map(todo => (
                <TodoView todo={todo} key={todo.id} />
            ))}
        </ul>
    </div>
))
```

In the above listing React will unnecessarily need to reconcile all TodoView components when the user.name changes. They won't re-render, but the reconcile process is expensive in itself. 不会 re-render, 但是 reconcile。

https://mobx.js.org/defining-data-stores.html

Domain objects can delegate all their logic to the store they belong to if that suits your application well. It is possible to express your domain objects as plain objects, but classes have some important advantages over plain objects:

- They can have methods. This makes your domain concepts easier to use standalone and reduces the amount of contextual awareness that is needed in your application. Just pass objects around. You don't have to pass stores around, or have to figure out which actions can be applied to an object if they are just available as instance methods. This is especially important in large applications.
- They offer fine grained control over the visibility of attributes and methods.
- Objects created using a constructor function can freely mix observable properties and methods, and non-observable properties and methods.
- They are easily recognizable and can be strictly type-checked.

https://mobx.js.org/understanding-reactivity.html

You can verify what MobX will track by calling trace() inside the tracked function.

Common pitfall: console.log

```ts
autorun(() => {
    console.log(message)
})

// Won't trigger a re-run.
message.updateTitle("Hello world")
```

In the above example, the updated message title won't be printed, because it is not used inside the autorun. The autorun only depends on message, which is not an observable, but a variable. In other words, as far as MobX is concerned, title is not used in the autorun.

If you use this in a web browser debugging tool, you may be able to find the updated value of title after all, but this is misleading -- autorun run after all has run once when it was first called. This happens because console.log is an asynchronous function and the object is only formatted later in time. This means that if you follow the title in the debugging toolbar, you can find the updated value. But the autorun does not track any updates.

The way to make this work is to make sure to always pass immutable data or defensive copies to console.log. So the following solutions all react to changes in message.title:

```ts
autorun(() => {
    console.log(message.title) // Clearly, the `.title` observable is used.
})

autorun(() => {
    console.log(mobx.toJS(message)) // toJS creates a deep clone, and thus will read the message.
})

autorun(() => {
    console.log({ ...message }) // Creates a shallow clone, also using `.title` in the process.
})

autorun(() => {
    console.log(JSON.stringify(message)) // Also reads the entire structure.
})
```

Correct: access array functions in tracked function

```ts
autorun(() => {
    console.log(message.likes.join(", "))
})
message.likes.push("Jennifer")
```

This will react as expected. All array functions that do not mutate the array are tracked automatically.

https://mobx.js.org/computeds-with-args.html

Computeds with arguments {🚀}

- Derivations don't need to be computed
- Close over the arguments
- Use computedFn


https://mobx.js.org/configuration.html

Linting options

To help you adopt the patterns advocated by MobX, a strict separation between actions, state and derivations, MobX can "lint" your coding patterns at runtime by hinting at smells. To make sure MobX is as strict as possible, adopt the following settings and read on for their explanations:

```ts
import { configure } from "mobx"

configure({
    enforceActions: "always",
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: true
})
```