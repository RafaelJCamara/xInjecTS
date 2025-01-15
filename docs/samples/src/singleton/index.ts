import { Injectable, Inject, Lifetime } from '@rafaeljcamara/xinjects';

/**
 * Example 1: Don't specify the dependency lifetime.
 * When no lifetime is specified, the default lifetime is Singleton.
 */
@Injectable()
class SingletonDependency1{
    someRandomValue: number;
    constructor(){
        this.someRandomValue = Math.random();
    }
}

class Target1{
    @Inject()
    dependency1!: SingletonDependency1;

    @Inject()
    dependency2!: SingletonDependency1;
}

console.log("***** Example 1 *****");

const target1 = new Target1();

console.log("Dependency 1: ", target1.dependency1.someRandomValue);
console.log("Dependency 2: ", target1.dependency2.someRandomValue);

console.log("***** Example 1 *****");



/**
 * Example 2: Explicitly specify the dependency lifetime.
 */
@Injectable({
    lifetime: Lifetime.Singleton
})
class SingletonDependency2{
    someRandomValue: number;
    constructor(){
        this.someRandomValue = Math.random();
    }
}

class Target2{
    @Inject()
    dependency1!: SingletonDependency2;

    @Inject()
    dependency2!: SingletonDependency2;
}

console.log("***** Example 2 *****");

const target2 = new Target2();

console.log("Dependency 1: ", target2.dependency1.someRandomValue);
console.log("Dependency 2: ", target2.dependency2.someRandomValue);

console.log("***** Example 2 *****");