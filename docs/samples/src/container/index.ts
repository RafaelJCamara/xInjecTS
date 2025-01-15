
import { IInjectableConfiguration, Lifetime, xContainer } from "@rafaeljcamara/xinjects";

/**
 * Example 1: register and resolve a Singleton dependency by providing explictly the lifetime.
 */

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

console.log("***** Example 1 [Singleton] *****");
console.log(resolvedSingletonService1.randomNumber);
console.log(resolvedSingletonService2.randomNumber);
console.log("***** Example 1 [Singleton] *****");

/**
 * Example 2: register and resolve a Singleton dependency (implicitly Singleton).
 */

class SingletonServiceImplicit {
    randomNumber: number;

    constructor() {
        this.randomNumber = Math.random();
    }
}

xContainer.register(SingletonServiceImplicit);

const resolvedSingletonService1Implicit = xContainer.resolve<SingletonServiceImplicit>('SingletonServiceImplicit');
const resolvedSingletonService2Implicit = xContainer.resolve<SingletonServiceImplicit>('SingletonServiceImplicit');

console.log("***** Example 2 [Singleton] *****");
console.log(resolvedSingletonService1Implicit.randomNumber);
console.log(resolvedSingletonService2Implicit.randomNumber);
console.log("***** Example 2 [Singleton] *****");


/**
 * Example 3: register and resolve a Transient dependency.
 */

class TransientService {
    randomNumber: number;

    constructor() {
        this.randomNumber = Math.random();
    }
}

const transientConfig: IInjectableConfiguration = { lifetime: Lifetime.Transient };
xContainer.register(TransientService, transientConfig);

const resolvedTransientService1 = xContainer.resolve<TransientService>('TransientService');
const resolvedTransientService2 = xContainer.resolve<TransientService>('TransientService');

console.log("***** Example 3 [Transient] *****");
console.log(resolvedTransientService1.randomNumber);
console.log(resolvedTransientService2.randomNumber);
console.log("***** Example 3 [Transient] *****");

/**
 * Example 4: register and resolve a Singleton dependency using a factory.
 */

class SingletonServiceFactory {
    randomNumber: number;

    constructor(ctorNumber: number) {
        this.randomNumber = ctorNumber + Math.random();
    }
}

const singletonFactoryConfig: IInjectableConfiguration = {
    lifetime: Lifetime.Singleton,
    useFactory: () => new SingletonServiceFactory(2)
};
xContainer.register(SingletonServiceFactory, singletonFactoryConfig);

const resolvedSingletonServiceFactory1 = xContainer.resolve<SingletonServiceFactory>('SingletonServiceFactory');
const resolvedSingletonServiceFactory2 = xContainer.resolve<SingletonServiceFactory>('SingletonServiceFactory');

console.log("***** Example 4 [Singleton with Factory] *****");
console.log(resolvedSingletonServiceFactory1.randomNumber);
console.log(resolvedSingletonServiceFactory2.randomNumber);
console.log("***** Example 4 [Singleton with Factory] *****");