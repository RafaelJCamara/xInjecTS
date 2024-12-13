import { Lifetime } from "../container/lifetime";
import { InjectionKey } from "./types";

/**
 * Interface representing the configuration for an injectable.
 */
export interface IInjectableConfiguration {
    /**
     * The lifetime of the injectable.
     */
    lifetime: Lifetime;

    /**
     * Token that represents an interface that can be used to resolve this injectable.
     */
    resolvedBy?: InjectionKey;

    /**
     * Optional unique token for the injectable.
     */
    token?: InjectionKey;
}