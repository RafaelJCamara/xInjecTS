import { IInjectableConfiguration } from "../_shared/injectable.configuration";
import { GenericConstructor } from "../_shared/types";
import { xContainer } from "../container/di-container";

/**
 * Decorator that marks a class as injectable and registers it with the dependency injection container.
 *
 * @template T - The type of the class constructor.
 * @param {Partial<IInjectableConfiguration>} [injectableConfiguration={}] - Optional configuration for the injectable.
 * @returns {Function} - A decorator function that registers the class with the dependency injection container.
 */
export function Injectable<T extends GenericConstructor>(injectableConfiguration: IInjectableConfiguration = {}) {
    return function (constructor: T) {
        xContainer.register(constructor, injectableConfiguration);
    };
}