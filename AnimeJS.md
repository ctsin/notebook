# Scale SVG elements from center

As reproducing an logo animation, the `<circle />` doesn't transform from the center of itself.

Origin Demo: https://codepen.io/borntofrappe/pen/xxZqLjN

Cloned Demo: https://codepen.io/tsing/pen/rNEXjZo

The reason is explained in https://pixelhop.io/writing/building-an-animated-svg-logo-with-animejs/

> By default, transforms for SVGs are performed relative to the parent SVG rather than the individual element.

The solution is defining the following CSS properties:

```css
#letters path {
  transform-box: fill-box;
  transform-origin: center;
}
```

> Same solution in Remotion docs https://www.remotion.dev/docs/figma#animate-svg-markup

> Heads Up: But it doesn't work well as a SVG mask in AnimeJS ☹️

GSAP forum offers the other two options for mask.

https://gsap.com/community/forums/topic/23449-scaling-a-masked-svg-from-the-center/

1. GSAP deal with `transform-origin`
   
   https://codepen.io/mikeK/pen/mdJQqrB

   ```js
   gsap.set("#circleMask,#circleMaskTWO", {scale:0, transformOrigin:"center center"});
   gsap.to("#circleMask", {scale:5, transformOrigin:"center center", duration:5, ease:'power3.in'});
   ```
2. not transform with `scale`, but animate the radius of `<circle />` element. 
   > Works with AnimeJS
   
   https://codepen.io/PointC/pen/VwLVxwx
   
   ```js
   tl.to("#circleMask, #circleClip", { duration: duration, attr: { r: 50 } });
   ```

**Conclusion**

1. animate radius of `<circle />` element;
2. wrap with `<g transform="translate(0 85)"><circle /></g>`, then animate `<circle />`.