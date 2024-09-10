# Framer Motion

https://www.framer.com/motion/examples/#line-drawing

```jsx
<motion.circle
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
/>
```

---

https://www.framer.com/motion/examples/#animating-gradients

```jsx
const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

function Image({ id }: { id: number }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  return (
    <section>
      <motion.div
        initial={false}
        animate={
          isLoaded && isInView
            ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
            : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
        }
        transition={{ duration: 1, delay: 1 }}
        viewport={{ once: true }}
        onViewportEnter={() => setIsInView(true)}
      >
        <img src={`/${id}.jpg`} alt="" onLoad={() => setIsLoaded(true)} />
      </motion.div>
    </section>
  );
}
```
---

https://www.framer.com/motion/examples/#path-morphing

See also:

- https://github.com/veltman/flubber
- [react-svg-morph](https://github.com/gorangajic/react-svg-morph) - utility for morphing between two SVGs in React
- [GreenSock MorphSVG plugin](https://greensock.com/morphSVG) - GSAP shape morphing utility (costs money, not open source)
- [d3.geo2rect](https://github.com/sebastian-meier/d3.geo2rect) - a plugin for morphing between GeoJSON and a rectangular SVG grid
- [d3-interpolate-path](https://github.com/pbeshai/d3-interpolate-path) - a D3 interpolator to interpolate between two unclosed lines, for things like line chart transitions with mismatched data
- [Wilderness](https://github.com/colinmeinke/wilderness) - an SVG manipulation and animation library
- [Cirque](https://github.com/two-n/cirque) - JS utility for morphing between circles and polygons

---

More ways to transform objects

https://www.remotion.dev/docs/transforms#more-ways-to-transform-objects

* The height and width of a <div>
* The rounded edges of an element using border-radius
* The shadow of an element using box-shadow
* The color of something using color and interpolateColors()
* The evolution of a SVG path using evolvePath()
* The weight and slant of a dynamic font
* The stops of a linear-gradient
* The values of a CSS filter()

# 《JavaScript网页动画设计》

> 避免影响到临近元素的解决办法是尽可能设置CSS的transform属性（translateX、translateY、scaleX、scaleY、rotateZ、rotateX和rotateY）的动画。transform属性的特殊之处在于它们将目标元素提升至一个单的层，这个层可以独立于页面其他内容单独渲染（通过GPU加速提升性能），因此相邻的元素不会受到影响。

# SVG stroke animation trick

https://css-tricks.com/a-trick-that-makes-drawing-svg-lines-way-easier/

https://codepen.io/tsing/pen/RwwZeGQ

You don’t have to measure the length of the path, because you can set it. 

```svg
<path d="M66.039,133.545 ... " pathLength="1" 👈 />
```

# Property inheriting in Framer Motion

https://blog.noelcserepy.com/how-to-animate-svg-paths-with-framer-motion#heading-explanations-1

https://codesandbox.io/p/sandbox/path-examples-advanced-forked-xrnfnc?file=%2Fcomponents%2FhoverButton.jsx%3A49%2C34

```jsx
<motion.div
  // Define property on parent element
  whileHover="hover"
  initial="default"
  animate="default"
  className="hoverButton"
>
  // The variants can receive animation target
  <motion.p variants={textVariants} className="hoverButtonText">
    Hover me
  </motion.p>
  <motion.svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      variants={outlineVariants}
      strokeWidth="1"
      fill="none"
      stroke="grey"
      d="M 0, 0 H 100 V 20 H 0 Z"
    />
  </motion.svg>
</motion.div>
```