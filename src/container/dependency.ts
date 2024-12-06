import { Lifetime } from "./lifetime";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDependency {
    value: any;
    lifetime: Lifetime;
}