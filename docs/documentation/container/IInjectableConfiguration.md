# IInjectableConfiguration

The `IInjectableConfiguration` interface defines the configuration options for registering dependencies in the `xContainer`.

## Properties

### `lifetime`

Specifies the lifetime of the dependency. It determines how the container manages the instance of the dependency.
To know more about each lifetime, please refer to [its documentation](../lifetime/lifetime.md).

- **Type:** `Lifetime`
- **Default:** `Lifetime.Singleton`

### `token`

Specifies the token used to identify the dependency. If not provided, it defaults to the name of the dependency class.

- **Type:** `string`
- **Default:** The name of the dependency class
- **Example:** If the dependency class is named `MyDependency`, the token will be named `"MyDependency"`.

### `useFactory`

Specifies a factory function to create the instance of the dependency.

- **Type:** `() => any`
- **Optional**
- **Example**

```typescript
import { Injectable } from '@rafaeljcamara/xinjects';

@Injectable({
    useFactory: () => new ServiceB(123)
})
class ServiceB{
    myA!: number;
    constructor(a:number){
        this.myA = a;
    }   
}
```

So whenever a new instance of `ServiceB` is requested, it will use the factory method `() => new ServiceB(123)`.