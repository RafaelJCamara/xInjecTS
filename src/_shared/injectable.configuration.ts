/* eslint-disable @typescript-eslint/no-explicit-any */

import { Lifetime } from "../container/lifetime";
import { InjectionKey } from "./types";

/**
 * Interface representing the configuration for an injectable.
 */
export interface IInjectableConfiguration {
    /**
     * The lifetime of the injectable.
     */
    lifetime?: Lifetime;

    /**
     * Optional token that represents an interface that can be used to resolve this injectable.
     */
    resolvedBy?: InjectionKey;

    /**
     * Optional unique token for the injectable.
     */
    token?: InjectionKey;

    /**
     * Optional factory function to create the injectable.
     * Use this factory whenever:
     *  - you want to have a custom way os creating objects that must be injected
     *  - the object has in its constructor a parameter that is not registered in the container (ex. integer)
     */
    useFactory?: () => any;
}