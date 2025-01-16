# Lifetime

The `Lifetime` represents the lifetime of a service in the dependency injection container.

This directly impacts the way the dependencies are created.

## Lifetime Values

- **Singleton**: A single instance of the service is created and shared.
- **Transient**: A new instance of the service is created each time it is requested.

## Usage

The `Lifetime` can be used to specify the lifetime of a service when registering it with the dependency injection container directly or when configuring the dependency with the `@Injectable` decorator (via the [IInjectableConfiguration](../container/IInjectableConfiguration.md) configuration object).

### Example

```typescript
import { Lifetime, xContainer } from "@rafaeljcamara/xinjects";

class MyService {
    // Service implementation
}

// Registering a service with Singleton lifetime
xContainer.register(MyService, { lifetime: Lifetime.Singleton });

// Registering a service with Transient lifetime
xContainer.register(MyService, { lifetime: Lifetime.Transient });
```

For more examples, please refer to [our samples](../../samples/samples.md).