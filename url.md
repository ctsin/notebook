https://gomakethings.com/how-to-use-the-url-api-with-vanilla-js/

MDN: https://developer.mozilla.org/en-US/docs/Web/API/URL/URL

The new URL() constructor returns an object with same properties as a the window.location property.

```ts
var url = new URL('https://gomakethings.com/about?num=42&greeting=hello#contact');

// The hash or anchor link on the URL
// returns "#contact"
url.hash;

// The root domain of the URL
// returns "gomakethings.com"
url.hostname;

// The full URL
// returns "https://gomakethings.com/about?num=42&greeting=hello#contact"
url.href;

// The root domain, including the protocol
// returns "https://gomakethings.com"
url.origin;

// The path on the URL
// returns "/about"
url.pathname;

// The protocol on the URL
// returns "https:"
url.protocol;

// The query strings (as a string) on the URL
// returns "?num=42&greeting=hello"
url.search;

// Update values
url.hash = 'photo';
```
