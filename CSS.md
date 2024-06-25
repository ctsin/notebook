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
