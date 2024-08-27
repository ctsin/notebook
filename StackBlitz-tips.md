# CSS dark / light mode

https://x.com/stackblitz/status/1828082068632588613

- Use `light-dark()` CSS function to define the colors without having to write media queries
- Switch between the light/dark modes conveniently using DevTools

# Tagged Template Literals

![](https://pbs.twimg.com/media/ExFO6hSWQAsn-VF?format=jpg&name=4096x4096)

- Set Object properties with `as const `to make it `readonly` https://twitter.com/i/status/1326890872961720320 https://t.co/SIaxuIdogs?amp=1
- Set the dictionary-like Object as strict as possible( with `Record`) https://twitter.com/i/status/1326525346443898882 https://t.co/QdYSvKd8o4?amp=1
- Define a type in `d.ts`https://twitter.com/i/status/1326194158843916289
- Set the `Array` with `as const `to make it `readonly` https://twitter.com/i/status/1325818478675304448 https://t.co/TEnIxVYsMT?amp=1

## Deal with numeric input in HTML

When dealing with numeric inputs – such as number, range, or date – you can use the `.valueAsNumber` property to get an actual number instead of a string (that the `.value` returns.)

https://twitter.com/i/status/1362048512943398914

## Create an array with a given length

https://twitter.com/i/status/1352270624471863297

`[...Array(10).keys()]`

Explanation:
1. `Array(10)` creates an array, but with no values
2. Spread operator used on it gives `undefined` values
3. `Array.keys()` return keys, but as an iterator. Spread that to get values starting with 0 which put in bracket gives a proper array.

## Use `console.log` directly

https://twitter.com/i/status/1354068271801233408

Have you ever written `v => console.log(v)` to quickly find out what comes in a callback? There's a more convenient way: 

Just use `console.log` directly!

(it's not only less typing, but also "automatically" gets all the params, if there's more than one)

## Use `start` attribute in ordered list

Use the `start` attribute to change the starting point for your ordered lists.

<img height="200" src="https://pbs.twimg.com/media/Eu-b10NXMAAiR_M?format=png&name=900x900">
