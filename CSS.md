# Define CSS style type in React

```js
interface MyComponentProps {
  styles: React.CSSProperties; // 🚀
}

const MyComponent: React.FC<MyComponentProps> = ({ styles }) => {
  return <div style={styles}>Hello, world!</div>;
};
```

# `accent-color` in CSS

https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color

Setting `accent-color` for HTML controls, support the following elements:

- \<input type="checkbox"\>
- \<input type="radio"\>
- \<input type="range"\>
- \<progress\>

# Animate On Scroll With Just 3 LINES Of CSS

https://www.youtube.com/watch?v=0TnO1GzKWPc

```css
@keyframes appear {
  from {
    opacity: 0;
    clip-path: inset(100% 100% 0 0);
  }
  to {
    opacity: 1;
    clip-path: inset(0 0 0 0);
  }
}

.block {
  animation: appear linear;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
}
```
