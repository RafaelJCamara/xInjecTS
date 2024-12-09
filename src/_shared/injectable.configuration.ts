import { Lifetime } from "../container/lifetime";

/**
 * Interface representing the configuration for an injectable.
 */
export interface IInjectableConfiguration {
    /**
     * The lifetime of the injectable.
     */
    lifetime: Lifetime;

    /**
     * Interface that can be used to resolve the injectable.
     */
    resolvedBy?: string;

    /**
     * Optional unique token for the injectable.
     */
    token?: string;
}