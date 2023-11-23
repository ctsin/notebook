/**
 * What Confused
 */
type Name = { name: string };
type Age = { age: number };

type NameOrAge = Name | Age;
export const nameOrAge: NameOrAge = { name: "Foo", age: 9 };

type NameAndAge = Name & Age;
export const nameAndAge: NameAndAge = { name: "Foo", age: 9 };

/**
 * Access
 */

export const isName = (nameOrAge: NameOrAge): nameOrAge is Name => {
  // return "name" in nameOrAge
  // return !!(nameOrAge as Name).name
  return (nameOrAge as Name).name !== undefined
}

// export const isAge = (nameOrAge: unknown): asserts nameOrAge is Age => {
  // return "name" in nameOrAge
  // return !!(nameOrAge as Name).name
//   if ((nameOrAge as Age).age === undefined ) {
//     throw new TypeError(`The ${nameOrAge} is NOT assignable to type "Age"`)
//   }
// }

export const nameOrAgeFn = (args: NameOrAge) => {
  if (isName(args)) {
    console.log("🚀  ~ nameOrAgeFn ~ args:", args.name);
  }

  // isAge(args as Age);
  
  console.log("🚀  ~ nameOrAgeFn ~ args:", args.age);
};
nameOrAgeFn({ name: "Foo" });
nameOrAgeFn({ age: 9 });
nameOrAgeFn({ name: "Foo", age: 9 });

type NameOrAgeWithShared = { name: string } | { name: string; age: number };
export const nameOrAgeWithSharedFn = (args: NameOrAgeWithShared) => {
  console.log("🚀  ~ nameOrAgeWithSharedFn ~ args:", args.name);
};

export const nameAndAgeFn = (args: NameAndAge) => {
  console.log("🚀 ~ nameAndAgeFn ~ args:", args.);
};
nameAndAgeFn({ name: "Foo", age: 9 });

/**
 * As same key with different types happens
 */

// For Intersection Types
// X receives THREE properties: `name`, `age`, and `gender`.
// Age props with different types
type Intersections = {
  name: string;
  age: number;
} & {
  gender: "M" | "F";
  age: string;
};

declare const intersections: Intersections;

// Age will receives `never` types, with error:
// Type 'string' is not assignable to type 'never'.(2322)
intersections.age = "";

// For Union Types
// X receives ONE property: `age`.
// Age props with different types
type Unions =
  | {
      name: string;
      age: number;
    }
  | {
      gender: "M" | "F";
      age: string;
    };

declare const unions: Unions;

// Age will receives `string | number` types, without error.
unions.age = "";
unions.age = 9;

// Discriminated Unions (可辨识联合类型)
// https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions
// https://www.tslang.cn/docs/handbook/advanced-types.html

interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
  }
}

/**
 * Conclusion
 * Rename the type names:
 * Unions => Or
 * Intersections => And
 */

/**
 * References
 * https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#defining-a-union-type
 * https://www.tslang.cn/docs/handbook/advanced-types.html
 */


type Evt =
  | {
      type: "SIGN_IN";
      payload: {
        userID: string;
      };
    }
  | { type: "SIGN_OUT" };

// const sendEvent = (eventType: Evt["type"], payload?: any) => {}
type TT<X> = X extends () => infer Y ? Y : never;
const tt: TT<() => boolean, > =  false;

declare function sendEvent<T extends Evt["type"]>(
  ...args: Extract<Evt, { type: T }> extends { payload: infer Payload }
    ? [type: T, payload: Payload]
    : [type: T]
): void;

// Correct
sendEvent("SIGN_OUT");
sendEvent("SIGN_IN", { userID: "123" });

// Should Error
sendEvent("SIGN_OUT", {});
sendEvent("SIGN_IN", { userID: 123 });
sendEvent("SIGN_IN", {});
sendEvent("SIGN_IN");
