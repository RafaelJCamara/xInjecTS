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
     * Optional identifier for the resolver.
     */
    resolvedBy?: string;

    /**
     * Optional token for the injectable.
     */
    token?: string;
}