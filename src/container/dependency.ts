/* eslint-disable @typescript-eslint/no-explicit-any */

import { Lifetime } from "./lifetime";

export interface IDependency {
    value: any;
    lifetime: Lifetime;
}