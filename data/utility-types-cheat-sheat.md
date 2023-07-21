---
name: Utility Types
route: /utility-types
description: Typescript Utility Types Cheat Sheet
date: 2023-07-20
---

# Unraveling TypeScript Utility Types

TypeScript, the statically-typed superset of JavaScript, has seen a surge in popularity among developers due to its powerful type system, which enhances code maintainability, readability, and documentation. Central to TypeScript's type system are utility types – generic types provided by TypeScript which can be used to transform one type into another. These utility types provide a robust toolset for developers to model complex type behaviors, making TypeScript even more versatile and efficient.

> The first part of this article, serves as a cheat sheet for TypeScript utility types. It provides a quick reference for each utility type, highlighting its purpose and use-cases. The second part of this article, serves as a deep dive into the TypeScript type system, explaining how utility types work under the hood and how you can create your own utility types.

`Table of Contents:`

- [Unraveling TypeScript Utility Types](#unraveling-typescript-utility-types)
  - [`Awaited<T>`](#awaitedt)
  - [`Partial<T>`](#partialt)
  - [`Required<T>`](#requiredt)
  - [`Readonly<T>`](#readonlyt)
  - [`Record<K, T>`](#recordk-t)
  - [`Pick<T, K>`](#pickt-k)
  - [`Omit<T, K>`](#omitt-k)
  - [`Exclude<T, U>`](#excludet-u)
  - [`Extract<T, U>`](#extractt-u)
  - [`NonNullable<T>`](#nonnullablet)
  - [`Parameters<T>`](#parameterst)
  - [`ConstructorParameters<T>`](#constructorparameterst)
  - [`ReturnType<T>`](#returntypet)
  - [`InstanceType<T>`](#instancetypet)
  - [`ThisParameterType<T>`](#thisparametertypet)
  - [`OmitThisParameterType<T>` (also available as `OmitThisParameter<T>`)](#omitthisparametertypet-also-available-as-omitthisparametert)
  - [`ThisType<T>`](#thistypet)
  - [Intrinsic String Manipulation Types](#intrinsic-string-manipulation-types)
    - [`Uppercase`](#uppercase)
    - [`Lowercase`](#lowercase)
    - [`Capitalize`](#capitalize)
    - [`Uncapitalize`](#uncapitalize)
  - [Beyond the Basics of Utility Types](#beyond-the-basics-of-utility-types)
  - [Enforcing Type Safety](#enforcing-type-safety)
  - [Enhancing Code Expressiveness](#enhancing-code-expressiveness)
  - [In conclusion](#in-conclusion)

## `Awaited<T>`

This utility type extracts the resolved type from a `Promise`. It unwraps the type `T` if it's a `Promise` or leaves it unchanged if it's not

> Released: 4.5

Example:

```typescript
// type A {string}
type A = Awaited<Promise<string>>;
// type B {number}
type B = Awaited<Promise<Promise<number>>>;
// type C {number | boolean}
type C = Awaited<boolean | Promise<number>>;

async function fetchData(): Promise<string> {
  return 'Data fetched!';
}

type ResolvedData = Awaited<ReturnType<typeof fetchData>>;

const data: ResolvedData = 'Data fetched!'; // The resolved type of the promise
```

## `Partial<T>`

This utility type allows you to make all properties of a type `T` optional. It creates a new type where each property of `T` is optional, meaning you can choose to provide or omit values for those properties. `Partial` is useful when you want to construct an object incrementally or when you have a function that accepts an object with optional properties

> Released: 2.1

Example:

```typescript
interface Person {
  name: string;
  age: number;
  address: string;
}

function updatePerson(person: Partial<Person>): void {
  // Update properties of person
}

// Usage
const partialPerson: Partial<Person> = { name: 'John' }; // All other properties are optional
updatePerson(partialPerson);
```

## `Required<T>`

This utility type makes all properties of a type `T` required. It ensures that every property in the resulting type must be present

> Released: 2.8

Example:

```typescript
interface Person {
  name?: string;
  age?: number;
}

const person: Required<Person> = {
  name: 'John',
  age: 30,
}; // All properties are now required
```

## `Readonly<T>`

This utility type makes all properties of a type `T` read-only. It prevents you from modifying the properties of the resulting type

> Released: 2.1

Example:

```typescript
interface Person {
  name: string;
  age: number;
}

const person: Readonly<Person> = {
  name: 'John',
  age: 30,
};

person.name = 'Alice'; // Error: Cannot assign to 'name' because it is a read-only property
```

## `Record<K, T>`

This utility type creates a new type with a set of properties `K` of type `T`. It is commonly used to define a dictionary or a mapping object where the keys of the object have a specific type and the values have a specific type

> Released: 2.1

Example:

```typescript
type Fruit = 'apple' | 'banana' | 'orange';
type FruitInventory = Record<Fruit, number>;

const inventory: FruitInventory = {
  apple: 5,
  banana: 10,
  orange: 3,
};
```

## `Pick<T, K>`

This utility type allows you to create a new type by selecting a subset of properties `K` from type `T`. It is useful when you want to extract specific properties from an existing type to create a new type that only includes those properties

> Released: 2.1

Example:

```typescript
interface Person {
  name: string;
  age: number;
  address: string;
  email: string;
}

type PersonSubset = Pick<Person, 'name' | 'age'>;

const person: PersonSubset = {
  name: 'John',
  age: 30,
};
```

## `Omit<T, K>`

This utility type creates a new type by excluding properties `K` from type `T`. It is the opposite of `Pick` and allows you to create a new type that includes all properties of `T` except the specified ones

> Released: 3.5

Example:

```typescript
interface Person {
  name: string;
  age: number;
  address: string;
  email: string;
}

type PersonWithoutEmail = Omit<Person, 'email'>;

const person: PersonWithoutEmail = {
  name: 'John',
  age: 30,
  address: '123 Main St',
};
```

## `Exclude<T, U>`

This utility type excludes from `T` all the types that are assignable to `U`. It creates a new type by removing types from `T` that are present in `U`

> Released: 2.8

Example:

```typescript
type Color = 'red' | 'blue' | 'green';
type PrimaryColor = 'red' | 'blue';

type SecondaryColor = Exclude<Color, PrimaryColor>; // 'green'
```

## `Extract<T, U>`

This utility type extracts from `T` all the types that are assignable to `U`. It creates a new type by selecting types from `T` that are also present in `U`

> Released: 2.8

Example:

```typescript
type Color = 'red' | 'blue' | 'green';
type PrimaryColor = 'red' | 'blue';

type PrimaryColors = Extract<Color, PrimaryColor>; // 'red' | 'blue'
```

## `NonNullable<T>`

This utility type creates a new type by excluding `null` and `undefined` from `T`. It ensures that the resulting type cannot be `null` or `undefined`

> Released: 2.8

Example:

```typescript
type Value = string | null | undefined;

const value: NonNullable<Value> = 'Hello'; // Value cannot be null or undefined
```

## `Parameters<T>`

This utility type extracts the parameter types from a function type `T` and represents them as a tuple type

> Released: 3.1

Example:

```typescript
type SumFunc = (a: number, b: number) => number;

type SumParams = Parameters<SumFunc>; // [number, number]
```

## `ConstructorParameters<T>`

This utility type extracts the parameter types from the constructor of a class type `T` and represents them as a tuple type

> Released: 3.1

Example:

```typescript
class Person {
  constructor(name: string, age: number) {
    // ...
  }
}

type PersonConstructorParams = ConstructorParameters<typeof Person>; // [string, number]
```

## `ReturnType<T>`

This utility type extracts the return type from a function type `T`

> Released: 2.8

Example:

```typescript
type SumFunc = (a: number, b: number) => number;

type SumResult = ReturnType<SumFunc>; // number
```

## `InstanceType<T>`

This utility type extracts the instance type from a class type `T`. It represents the type that an instance of the class would have

> Released: 2.8

Example:

```typescript
class Person {
  name: string;
  age: number;
}

type PersonInstance = InstanceType<typeof Person>; // Person
```

## `ThisParameterType<T>`

This utility type extracts the type of `this` parameter from a function type `T`. It represents the type of the `this` context within the function

> Released: 3.3

Example:

```typescript
type LogFunc = (this: Console, message: string) => void;

const log: ThisParameterType<LogFunc> = console;
log.call(console, 'Log message');
```

## `OmitThisParameterType<T>` (also available as `OmitThisParameter<T>`)

This utility type removes the `this` parameter from a function type `T`

> Released: 3.3

Example:

```typescript
type LogFunc = (this: Console, message: string) => void;

type LogFuncWithoutThis = OmitThisParameterType<LogFunc>; // (message: string) => void
```

## `ThisType<T>`

This utility type is used in a declaration file to specify that a certain type should be considered as the type of `this` within the enclosed scope. It is commonly used to provide type information for `this` in a function or method

> Released: 2.3

Example:

```typescript
// In a declaration file (.d.ts)
interface MyObject {
  method(): this;
}

const obj: MyObject = {
  method() {
    return this;
  },
};

const result = obj.method(); // The type of 'result' is 'MyObject'
```

## Intrinsic String Manipulation Types

### `Uppercase`

### `Lowercase`

### `Capitalize`

### `Uncapitalize`

These utility types transform the case of a string literal or string type

> To help with string manipulation around template string literals, TypeScript includes a set of types which can be used in string manipulation within the type system. You can find those in the [Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype) documentation.

Example:

```typescript
type UppercaseGreeting = Uppercase<'hello'>; // 'HELLO'
type LowercaseGreeting = Lowercase<'HELLO'>; // 'hello'
type CapitalizedWord = Capitalize<'world'>; // 'World'
type UncapitalizedWord = Uncapitalize<'World'>; // 'world'
```

## Beyond the Basics of Utility Types

TypeScript's utility types are more than just a feature of the language; they are powerful tools that enable developers to manipulate types to suit specific scenarios, ultimately augmenting the efficiency and productivity of the development process. By leveraging these utility types, developers can create more expressive code, articulating intricate type relationships and dependencies in a manner that is both clear and concise.

Imagine them as sculpting tools, enabling you to mold your raw types into intricate and detailed shapes that fit perfectly into the overall structure of your codebase. They allow you to manipulate types in ways that would otherwise be impossible or impractical, serving as an invaluable asset when dealing with complex or dynamic type situations.

## Enforcing Type Safety

One of the primary benefits of using TypeScript is its ability to enforce type safety, and utility types play a pivotal role in this. They ensure that variables and function return values conform to specific types, thereby catching potential errors at compile time, well before the code is executed. This leads to a drastic reduction in runtime errors and improves the reliability and robustness of your applications.

For example, consider the `Required<T>` utility type. It makes all properties of a type required. In doing so, it prevents potential runtime errors that could occur if some of the properties were missing or undefined.

Similarly, the `Readonly<T>` utility type prevents accidental modification of properties after they've been initialized, which is a common source of bugs in JavaScript code. By marking an object's type as `Readonly<T>`, TypeScript ensures that its properties can't be reassigned later, leading to more predictable and reliable code.

## Enhancing Code Expressiveness

Additionally, utility types enhance code expressiveness, essentially serving as a form of in-code documentation. By conveying more information about what a type does or what shape it should have, they can help developers understand the code better, resulting in less time spent figuring out what certain parts of the code are doing and more time spent on actual development.

Take, for example, the `Record<K, T>` utility type. It is used to create an object type where all properties are of a specific type. At first glance, this gives other developers an immediate understanding of the shape of the object and the types of values it contains, thereby improving readability and maintainability.

## In conclusion

TypeScript's utility types are instrumental in crafting type-safe, clear, and expressive code. They bridge the gap between dynamic and static typing, giving developers the flexibility to shape their types as per their needs while still reaping the benefits of TypeScript's robust type system. With them, we can push the boundaries of what's possible with TypeScript, resulting in a better, safer, and more efficient coding experience.
