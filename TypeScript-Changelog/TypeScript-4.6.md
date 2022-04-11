# Control Flow Analysis for Destructured Discriminated Unions

https://devblogs.microsoft.com/typescript/announcing-typescript-4-6/#control-flow-analysis-for-destructured-discriminated-unions

Previously TypeScript would error on these – once kind and payload were extracted from the same object into variables, they were considered totally independent.

In TypeScript 4.6, this just works!

