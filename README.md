<h1 align="center">
  xInjecTS
</h1>
<p align="center">
  Lightweight and simple dependency injection container for TypeScript.
</p>

## About

xInjecTS is designed to provide a lightweight and easy-to-use dependency injection container for TypeScript applications. It aims to simplify the management of dependencies and promote better code organization and testability.

## Install Package
```shell
npm i @rafaeljcamara/xinjects
```

## Usage

xInjecTs supports two ways of doing dependency injection:
1. Using our decorators: `@Injectable` and `@Inject`.
2. Directly interacting with our dependency injection container `xContainer`.

### Example 1: Using Decorators

```typescript
import { Injectable, Inject, xContainer } from '@rafaeljcamara/xinjects';

@Injectable()
class ServiceA {
  sayHello() {
    return 'Hello from ServiceA';
  }
}

@Injectable()
class ServiceB {
  constructor(@Inject(ServiceA) private serviceA: ServiceA) {}

  greet() {
    return this.serviceA.sayHello();
  }
}

const serviceB = xContainer.resolve(ServiceB);
console.log(serviceB.greet()); // Output: Hello from ServiceA
```

### Example 2: Using xContainer Directly

```typescript
import { xContainer } from '@rafaeljcamara/xinjects';

class ServiceA {
  sayHello() {
    return 'Hello from ServiceA';
  }
}

class ServiceB {
  constructor(private serviceA: ServiceA) {}

  greet() {
    return this.serviceA.sayHello();
  }
}

xContainer.register(ServiceA);

const serviceA = xContainer.resolve(ServiceA);

const serviceB = new ServiceB(serviceA);

console.log(serviceB.greet()); // Output: Hello from ServiceA
```

For more samples, please refer to our [samples](./docs/samples/samples.md).

## Contributing

This project welcomes and appreciates any contributions made.

There are several ways you can contribute, namely:

- Report any bug found.
- Suggest some features or improvements.
- Creating pull requests.

## License

xInjecTs is a free and open-source software licensed under the MIT License.

See [LICENSE](LICENSE) for more details.

## :warning: Known limitations

- No support `Symbols` as dependency keys.
- Factories can only be applied to `Singleton` dependencies.