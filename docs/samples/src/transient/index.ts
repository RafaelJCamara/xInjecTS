import { Injectable, Inject, Lifetime } from '@rafaeljcamara/xinjects';

/**
 * Example 1: Explicitly specify the dependency lifetime.
 */
@Injectable({
    lifetime: Lifetime.Transient
})
class TransientDependency{
    someRandomValue: number;
    constructor(){
        this.someRandomValue = Math.random();
    }
}

class Target{
    @Inject()
    dependency1!: TransientDependency;

    @Inject()
    dependency2!: TransientDependency;
}

console.log("***** Example 1 *****");

const target = new Target();

console.log("Dependency 1: ", target.dependency1.someRandomValue);
console.log("Dependency 2: ", target.dependency2.someRandomValue);

console.log("***** Example 1 *****");