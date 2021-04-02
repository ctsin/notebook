https://devblogs.microsoft.com/typescript/announcing-typescript-4-3-beta/

# Separate Write Types on Properties

That’s why TypeScript 4.3 allows you to specify types for reading and writing to properties.

```ts
class Thing {
    #size = 0;

    get size(): number {
        return this.#size;
    }

    set size(value: string | number | boolean) {
        let num = Number(value);

        // Don't allow NaN and stuff.
        if (!Number.isFinite(num)) {
            this.#size = 0;
            return;
        }

        this.#size = num;
    }
}
```

In fact, we’ve added syntax to interfaces/object types to support different reading/writing types on properties.

```ts
// Now valid!
interface Thing {
    get size(): number
    set size(value: number | string | boolean);
}
```

# `override` and the `--noImplicitOverride` Flag

```ts
class SpecializedComponent extends SomeComponent {
    override show() {
        // ...
    }
    override hide() {
        // ...
    }
}
```

# Template String Type Improvements

```ts
function bar(s: string): `hello ${string}` {
    // Previously an error, now works!
    return `hello ${s}`;
}
```

This also kicks in when inferring types, and the type parameter extends string

```ts
declare let s: string;
declare function f<T extends string>(x: T): T;

// Previously: string
// Now       : `hello-${string}`
let x2 = f(`hello ${s}`);
```

# ECMAScript #private Class Elements

```ts
class Foo {
    #someMethod() {
        //...
    }

    get #someValue() {
        return 100;
    }

    publicMethod() {
        // These work.
        // We can access private-named members inside this class.
        this.#someMethod();
        return this.#someValue;
    }
}

new Foo().#someMethod();
//        ~~~~~~~~~~~
// error!
// Property '#someMethod' is not accessible
// outside class 'Foo' because it has a private identifier.

new Foo().#someValue;
//        ~~~~~~~~~~
// error!
// Property '#someValue' is not accessible
// outside class 'Foo' because it has a private identifier.
```

Even more broadly, static members can now also have private names.

```ts
class Foo {
    static #someMethod() {
        // ...
    }
}

Foo.#someMethod();
//  ~~~~~~~~~~~
// error!
// Property '#someMethod' is not accessible
// outside class 'Foo' because it has a private identifier.
```

# static Index Signatures

```ts
class Foo {
    static hello = "hello";
    static world = 1234;

    static [propName: string]: string | number | undefined;
}

// Valid.
Foo["whatever"] = 42;

// Has type 'string | number | undefined'
let x = Foo["something"];
```

# Import Statement Completions

So when you now start writing an import statement that doesn’t have a path, we’ll provide you with a list of possible imports.

![](https://devblogs.microsoft.com/typescript/wp-content/uploads/sites/11/2021/03/111011663-f53c7580-834e-11eb-9a2a-3dc3ea24d0791.gif)