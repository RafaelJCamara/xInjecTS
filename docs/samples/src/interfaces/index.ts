/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Inject } from '@rafaeljcamara/xinjects';

/**
 * Example 1: Define an interface and a class that can be resolved whenever this interface is requested.
 */

interface ISampleInterface{
    someRandomValue: number;
}

@Injectable({
    //you can also specify the lifetime of the dependency, and it would work as intended depending on the lifetime you choose.
    resolvedBy: "ISampleInterface" //here you must specify the interface that will be resolved, in a string format
})
class SampleDependency implements ISampleInterface{
    someRandomValue: number
    
    constructor(){
        console.log("Calling the class to be resolved")
        this.someRandomValue = Math.random();
    }
}

class Target{
    @Inject("ISampleInterface")
    dependency1!: ISampleInterface;

    @Inject("ISampleInterface")
    dependency2!: ISampleInterface;
}

console.log("***** Example 1 *****");

const target = new Target();

console.log("Dependency 1: ", target.dependency1.someRandomValue);
console.log("Dependency 2: ", target.dependency2.someRandomValue);

console.log("***** Example 1 *****");
