
# Invoking a non-default superclass constructor

https://dart.dev/guides/language/language-tour#invoking-a-non-default-superclass-constructor

In summary, the order of execution is as follows:

- initializer list
- superclass’s no-arg constructor
- main class’s no-arg constructor

# Declaring enhanced enums
To declare an enhanced enum, follow a syntax similar to normal classes, but with a few extra requirements:

- Instance variables must be final, including those added by mixins.
- All generative constructors must be constant.
- Factory constructors can only return one of the fixed, known enum instances.
- No other class can be extended as Enum is automatically extended.
- There cannot be overrides for index, hashCode, the equality operator ==.
- A member named values cannot be declared in an enum, as it would conflict with the automatically generated static values getter.
- All instances of the enum must be declared in the beginning of the declaration, and there must be at least one instance declared.
