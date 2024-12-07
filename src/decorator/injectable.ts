/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericConstructor } from "../_shared/types";
import { xContainer } from "../container/di-container";
import { Lifetime } from "../container/lifetime";

/* eslint-disable @typescript-eslint/no-unsafe-function-type */

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export function Injectable<T extends GenericConstructor>(lifetime: Lifetime = Lifetime.Transient) {
    return function (constructor: T) {
        xContainer.register(constructor, undefined, lifetime);
    };
}