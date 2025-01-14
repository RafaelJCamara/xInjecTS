/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */


/**
 * A type representing a generic constructor function.
 * 
 * This type can be used to define a class constructor that can accept any number of arguments
 * and returns an instance of an object.
 * 
 * @typeParam T - The type of the instance that the constructor creates.
 */
export type GenericConstructor = { new (...args: any[]): {} };

/**
 * Represents a key used for dependency injection.
 */
export type InjectionKey = string;