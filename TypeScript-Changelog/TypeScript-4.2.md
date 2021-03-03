# Leading/Middle Rest Elements in Tuple Types

In TypeScript, tuple types are meant to model arrays with specific lengths and element types.

```ts
// A tuple that has either one or two strings.
let c: [string, string?] = ["hello"];
c = ["hello", "world"];

// A labeled tuple that has either one or two strings.
let d: [first: string, second?: string] = ["hello"];
d = ["hello", "world"];

// A tuple with a *rest element* - holds at least 2 strings at the front,
// and any number of booleans at the back.
let e: [string, string, ...boolean[]];

e = ["hello", "world"];
e = ["hello", "world", false];
e = ["hello", "world", true, false, true];
```

In TypeScript 4.2, rest element can occur anywhere within a tuple.

```ts
let foo: [...string[], number];

foo = [123];
foo = ["hello", 123];
foo = ["hello!", "hello!", "hello!", 123];

let bar: [boolean, ...string[], boolean];

bar = [true, false];
bar = [true, "some text", false];
bar = [true, "some", "separated", "text", false];
```

> ⚠️ **RESTRICTION** It's avoid to be followed by another optional element or rest element.

# Destructured Variables Can be Explicitly Marked as Unused

```ts
let [_first, second] = getValues();
```

Now, TypeScript will recognize that _first was intentionally named with an underscore because there was no intent to use it.

# Relaxed Rules Between Optional Properties and String Index Signatures

https://devblogs.microsoft.com/typescript/announcing-typescript-4-2-beta/#relaxed-rules-between-optional-properties-and-string-index-signatures

```ts
type WesAndersonWatchCount = {
  "Fantastic Mr. Fox"?: number;
  "The Royal Tenenbaums"?: number;
  "Moonrise Kingdom"?: number;
  "The Grand Budapest Hotel"?: number;
};

declare const wesAndersonWatchCount: WesAndersonWatchCount;
const movieWatchCount: { [key: string]: number } = wesAndersonWatchCount;
//    ~~~~~~~~~~~~~~~ error!
// Type 'WesAndersonWatchCount' is not assignable to type '{ [key: string]: number; }'.
//    Property '"Fantastic Mr. Fox"' is incompatible with index signature.
//      Type 'number | undefined' is not assignable to type 'number'.
//        Type 'undefined' is not assignable to type 'number'. (2322)
```

TypeScript 4.2 allows this assignment. 👆

However, it does not allow the assignment of non-optional properties with undefined in their types, nor does it allow writing undefined to a specific key:

```ts
type BatmanWatchCount = {
  "Batman Begins": number | undefined;
  "The Dark Knight": number | undefined;
  "The Dark Knight Rises": number | undefined;
};

declare const batmanWatchCount: BatmanWatchCount;

// Still an error in TypeScript 4.2.
// `undefined` is only ignored when properties are marked optional.
const movieWatchCount: { [key: string]: number } = batmanWatchCount;

// Still an error in TypeScript 4.2.
// Index signatures don't implicitly allow explicit `undefined`.
movieWatchCount["It's the Great Pumpkin, Charlie Brown"] = undefined;
```

> The new rule also does not apply to number index signatures, since they are assumed to be array-like and dense.