# Pseudo selector usage

https://codesandbox.io/s/ie3nt?file=/demo.js:334-637

https://codesandbox.io/s/suspicious-sound-i9tb1?file=/src/App.js

```ts
const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      content: '"Hello"' // ⚠️ double quote "", '' or `` to make pseudo work
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);
```
|                                                                                                 | makeStyles                                               | withStyles                                               | styled |
| ----------------------------------------------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | ------ |
| [multiple style rules](https://material-ui.com/styles/advanced/#overriding-styles-classes-prop) | O                                                        | O                                                        | X      |
| override the style by parent                                                                    | [O](https://material-ui.com/styles/advanced/#makestyles) | [O](https://material-ui.com/styles/advanced/#withstyles) | X      |
