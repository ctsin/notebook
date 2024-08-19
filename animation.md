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