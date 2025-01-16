# Dependency Injection Container

`xContainer` serves as the main container for managing dependency injection within the application.

You can interact with it directly, or do it indirectly by using [our decorators](../decorators/decorators.md).

## Methods

### `register`

Registers a dependency in the DI container.

#### Parameters

- `instance` (GenericConstructor): The class of the dependency to register. You pass in `DependencyToRegister` and not `new DependencyToRegister()`.
- `dependencyConfiguration` (Partial<IInjectableConfiguration>): The configuration for the dependency. This is an optional parameter, and it will go to the default configuration for `IInjectableConfiguration`.

To get to know more about this default configuration, and more about `IInjectableConfiguration`, please refer to [its documentation](./IInjectableConfiguration.md).

#### Throws

- `Error`: If a dependency with the same token is already registered.
- `Error`: If a factory is used with a non-singleton lifetime.

### `resolve`

Resolves a dependency based on the provided identifier.

#### Parameters

- `dependencyIdentifier` (InjectionKey | Constructor<T>): The identifier of the dependency to resolve. This can either be a string key or a constructor function.

#### Returns

- `T`: The resolved dependency instance.

#### Throws

- `Error`: If no dependency is found for the provided token.

## Example Usage

### Registering and Resolving a Singleton Dependency

```typescript
import { IInjectableConfiguration, xContainer } from "@rafaeljcamara/xinjects";

class SingletonService {
    randomNumber: number;

    constructor() {
        this.randomNumber = Math.random();
    }
}

const config: IInjectableConfiguration = { lifetime: Lifetime.Singleton };
xContainer.register(SingletonService, config);

const resolvedSingletonService1 = xContainer.resolve<SingletonService>('SingletonService');
const resolvedSingletonService2 = xContainer.resolve<SingletonService>('SingletonService');

console.log(resolvedSingletonService1.randomNumber);
console.log(resolvedSingletonService2.randomNumber);
```

For more usage examples, please refer to the [samples](../../samples/samples.md).