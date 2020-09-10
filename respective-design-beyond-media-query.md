https://css-tricks.com/beyond-media-queries-using-newer-html-css-features-for-responsive-designs/

# Truly responsive images

```html
<picture>
  <source media="(max-width:1000px)" srcset="picture-lg.png">
  <source media="(max-width:600px)" srcset="picture-mid.png">
  <source media="(max-width:400px)" srcset="picture-sm.png">
  <img src="picture.png" alt="picture"">
</picture>

<picture>
  <source media="(max-width:1000px)" srcset="picture-lg_1x.png 1x, picture-lg_2x.png 2x, picture-lg_3x.png 3x">
  <source media="(max-width:600px)" srcset="picture-mid_1x.png 1x, picture-mid_2x.png 2x, picture-mid_3x.png 3x">
  <source media="(max-width:400px)" srcset="picture-small_1x.png 1x, picture-small_2x.png 2x, picture-small_1x.png 3x">
  <img src="picture.png" alt="picture"">
</picture>

<img
 srcset="
  flower4x.png 4x,
  flower3x.png 3x,
  flower2x.png 2x,
  flower1x.png 1x
 "
 src="flower-fallback.jpg"
>
```

# Setting minimum and maximum values in CSS

min() https://developer.mozilla.org/en-US/docs/Web/CSS/min

max() https://developer.mozilla.org/en-US/docs/Web/CSS/max

```scss
.box {
  width : min(45%, 600px)
}

.box {
  width : max(60%, 600px)
}
```

# Clamping values

clamp() https://developer.mozilla.org/en-US/docs/Web/CSS/clamp

```scss
.box {
  font-size : clamp(1rem, 40px, 4rem)
}
```
