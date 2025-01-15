import { Injectable, Inject } from '@rafaeljcamara/xinjects';

@Injectable({
    useFactory: () => new SomeDependency(10),
})
class SomeDependency{
    someRandomValue: number;
    constructor(myNum: number){
        this.someRandomValue = myNum + Math.random();
    }
}

class Target{
    @Inject()
    dependency1!: SomeDependency;

    @Inject()
    dependency2!: SomeDependency;
}

console.log("***** Example 1 *****");

const target = new Target();

console.log("Dependency 1: ", target.dependency1.someRandomValue);
console.log("Dependency 2: ", target.dependency2.someRandomValue);

console.log("***** Example 1 *****");