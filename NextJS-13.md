- Files indicated in [File Conventions](https://beta.nextjs.org/docs/routing/fundamentals#file-conventions) CAN NOT be state with `use client`;
- client components CAN NOT be state with `async`;

## Layouts

https://beta.nextjs.org/docs/routing/pages-and-layouts#layouts

Passing data between a parent layout and its children is not possible. However, you can fetch the same data in a route more than once, and React will automatically dedupe the requests without affecting performance.

## Templates

https://beta.nextjs.org/docs/routing/pages-and-layouts#templates

There may be cases where you need those specific behaviors, and templates would be a more suitable option than layouts. For example:

- Enter/exit animations using CSS or animation libraries.
- Features that rely on useEffect (e.g logging page views) and useState (e.g a per-page feedback form).
- To change the default framework behavior. For example, Suspense Boundaries inside layouts only show the fallback the first time the Layout is loaded and not when switching pages. For templates, the fallback is shown on each navigation.

> Note that the template is given a unique key.

## Modifying Head

https://beta.nextjs.org/docs/routing/pages-and-layouts#modifying-head

In the app directory ... `head.js` should return a React fragment component and not a wrapping `<head>` tag.

## `<Link>` Component

https://beta.nextjs.org/docs/routing/linking-and-navigating#link-component

`<Link>` is a React component that extends the HTML `<a>` element to provide prefetching and client-side navigation between routes.

## `useRouter()` Hook

https://beta.nextjs.org/docs/routing/linking-and-navigating#userouter-hook

The `useRouter` hook allows you to programmatically change routes inside [Client Components](https://beta.nextjs.org/docs/rendering/server-and-client-components).

## `async`/`await` in Server Components

https://beta.nextjs.org/docs/data-fetching/fetching#asyncawait-in-server-components

Warning: You can use async/await in layouts and pages, which are Server Components. Using async/await inside other components, with TypeScript, can cause errors from the response type from JSX. We are working with the TypeScript team to resolve this upstream. As a temporary workaround, you can use {/* @ts-expect-error Server Component */} to disable type checking for the component.

## Prefetching

https://beta.nextjs.org/docs/routing/linking-and-navigating#prefetching


- Prefetching is only enabled in production.
- Prefetching can be disabled by passing prefetch={false} to <Link>.

## Handling Errors in Layouts

https://beta.nextjs.org/docs/routing/error-handling#handling-errors-in-layouts

`error.js` boundaries do not catch errors thrown in `layout.js` or `template.js` components of the same segment. This [intentional hierarchy](https://beta.nextjs.org/docs/routing/error-handling#nested-routes) keeps important UI that is shared between sibling routes (such as navigation) visible and functional when an error occurs.

## Using context in Client Components

https://beta.nextjs.org/docs/rendering/server-and-client-components#using-context-in-client-components

Note: You should render providers as deep as possible in the tree – notice how ThemeProvider only wraps {children} instead of the entire <html> document. This makes it easier for Next.js to optimize the static parts of your Server Components.

## When to use Server vs. Client Components?

https://beta.nextjs.org/docs/rendering/server-and-client-components#when-to-use-server-vs-client-components

