# Handling Static Assets in Jest

https://jestjs.io/docs/webpack#handling-static-assets

```json
// package.json
{
  "jest": {
    "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    }
  }
}
```

And the mock files themselves:

```ts
// __mocks__/styleMock.js

module.exports = {};
```

```ts
// __mocks__/fileMock.js

module.exports = 'test-file-stub';
```

> See also: [Mocking CSS Modules](https://jestjs.io/docs/webpack#mocking-css-modules)

# Useful interface

```dart
class TapboxB extends StatelessWidget {
  TapboxB({Key 👈 key, this.active: false, @required this.onChanged})
      : super(key: key);

  final bool active;
  final ValueChanged<bool> 👈 onChanged;
```

To use @required, import the foundation library (which re-exports Dart’s meta.dart library):

```dart
import 'package:flutter/foundation.dart';
```

还可以这么写：

```dart
@override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: ListView(
        children: [ 👇
          for (var book in books)
            ListTile(
              title: Text(book.title),
              subtitle: Text(book.author),
              onTap: () => onTapped(book),
            )
        ],
      ),
    );
  }
```

# Invoking a non-default superclass constructor

By default, a constructor in a subclass calls the superclass’s unnamed, no-argument constructor. The superclass’s constructor is called at the beginning of the constructor body. If an initializer list is also being used, it executes before the superclass is called. In summary, the order of execution is as follows:

- initializer list
- superclass’s no-arg constructor
- main class’s no-arg constructor

If the superclass doesn’t have an unnamed, no-argument constructor, then you must manually call one of the constructors in the superclass. Specify the superclass constructor after a colon (:), just before the constructor body (if any).

```dart
class Person {
  String? firstName;

  Person.fromJson(Map data) {
    print('in Person');
  }
}

class Employee extends Person {
  // Person does not have a default constructor;
  // you must call super.fromJson(data).
  Employee.fromJson(Map data) : super.fromJson(data) {
    print('in Employee');
  }
}

void main() {
  var employee = Employee.fromJson({});
  print(employee);
  // Prints:
  // in Person
  // in Employee
  // Instance of 'Employee'
}
```

# https://flutter.dev/docs/development/ui/widgets-intro

You might wonder why StatefulWidget and State are separate objects. In Flutter, these two types of objects have different life cycles. Widgets are temporary objects, used to construct a presentation of the application in its current state. State objects, on the other hand, are persistent between calls to build(), allowing them to remember information.

