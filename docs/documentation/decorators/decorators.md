# Decorators

Decorators provider you with a way to register and resolve your dependencies. Behind the scenes, it will interact with our `dependency injection container`.

We currently support two decorators:
- `@Injectable`
- `@Inject`

You can also work directly with the [dependency injection container](../container/container.md).

## `@Injectable`

The `@Injectable` decorator marks a class as injectable and registers it with the dependency injection container.

### Usage

```typescript
import { Injectable } from '@rafaeljcamara/xinjects';

@Injectable()
class MyService {
  // ...
}
```

You can also pass a `IInjectableConfiguration` configuration object to the `@Injectable` decorator.


```typescript
import { Injectable } from '@rafaeljcamara/xinjects';

@Injectable({
    lifetime: Lifetime.Transient,
    token: "MyServiceCustomToken"
})
class MyService {
  // ...
}
```

More informations about this configuration object can be found [here](../container/IInjectableConfiguration.md).


## `@Inject`

The `@Inject` allows you to resolve a given dependency.

There are currently two ways to resolve a dependency:
1. Property injection
2. Constructor injection


To properly inject something with the `@Inject` decorator, you can do one of the following:
1. Pass nothing to the `@Inject` decorator and it will determine the type of dependency to inject.
**Example**:
```typescript
import { Inject } from '@rafaeljcamara/xinjects';

class MyClass{
    @Inject()
    dependency: MyService;
}
```

2. Provide a string injection token that you have configured the dependency with (when using the `@Injectable` decorator).
**Example**:
```typescript
import { Inject } from '@rafaeljcamara/xinjects';

class MyClass{
    @Inject("MyServiceCustomToken")
    dependency: MyService;
}
```

3. Provide the class to inject, if you haven't configured any injection token while using the `@Injectable` decorator.
**Example**:
```typescript
import { Inject } from '@rafaeljcamara/xinjects';

class MyClass{
    @Inject(MyService)
    dependency: MyService;
}
```

### Property injection

**Example**:
```typescript
import { Inject } from '@rafaeljcamara/xinjects';

class MyClass{
    @Inject()
    dependency: MyService;
}
```

### Constructor injection

**Example**:
```typescript
import { Inject } from '@rafaeljcamara/xinjects';

class MyClass {
    constructor(@Inject() public dependency: MyService) {}
}
```

## :warning: Using decorators

To properly work and enable the usage of our decorators there are a couple of things you need to have in consideration.

1. You must be working with TypeScript.
2. You must enable these two properties in your `tsconfig.json` file:

```json
{
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
}
```