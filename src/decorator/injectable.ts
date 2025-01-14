import { IInjectableConfiguration } from "../_shared/injectable.configuration";
import { GenericConstructor } from "../_shared/types";
import { xContainer } from "../container/di-container";
import { Lifetime } from "../container/lifetime";


/**
 * Decorator that marks a class as injectable and registers it with the dependency injection container.
 *
 * @template T - The type of the class constructor.
 * @param {Partial<IInjectableConfiguration>} [injectableConfiguration={}] - Optional configuration for the injectable.
 * @returns {Function} - A decorator function that registers the class with the dependency injection container.
 */
export function Injectable<T extends GenericConstructor>(injectableConfiguration: Partial<IInjectableConfiguration> = {}) {
    const finalInjectableConfiguration = { ...defaultInjectableConfiguration, ...injectableConfiguration };
    return function (constructor: T) {
        xContainer.register(constructor, finalInjectableConfiguration);
    };
}

const defaultInjectableConfiguration: IInjectableConfiguration = {
    lifetime: Lifetime.Singleton
};