/* eslint-disable @typescript-eslint/no-explicit-any */
import { IInjectableConfiguration } from "../_shared/injectable.configuration";
import { GenericConstructor } from "../_shared/types";
import { xContainer } from "../container/di-container";
import { Lifetime } from "../container/lifetime";

/* eslint-disable @typescript-eslint/no-unsafe-function-type */

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export function Injectable<T extends GenericConstructor>(overrides: Partial<IInjectableConfiguration> = {}) {
    const configuration = { ...defaultInjectableConfiguration, ...overrides };
    return function (constructor: T) {
        xContainer.register(constructor, configuration);
    };
}

const defaultInjectableConfiguration: IInjectableConfiguration = {
    lifetime: Lifetime.Scoped
};