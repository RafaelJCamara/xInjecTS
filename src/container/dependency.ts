/* eslint-disable @typescript-eslint/no-explicit-any */

import { Lifetime } from "./lifetime";

/**
 * Represents a dependency with a value and a lifetime.
 *
 * @interface IDependency
 * @property {any} value - The value of the dependency.
 * @property {Lifetime} lifetime - The lifetime of the dependency.
 */
export interface IDependency {
    value: any;
    lifetime: Lifetime;
}