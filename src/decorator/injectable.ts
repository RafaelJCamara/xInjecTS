import { IInjectableConfiguration } from "../_shared/injectable.configuration";
import { GenericConstructor } from "../_shared/types";
import { xContainer } from "../container/di-container";
import { Lifetime } from "../container/lifetime";

export function Injectable<T extends GenericConstructor>(injectableConfiguration: Partial<IInjectableConfiguration> = {}) {
    const finalInjectableConfiguration = { ...defaultInjectableConfiguration, ...injectableConfiguration };
    return function (constructor: T) {
        xContainer.register(constructor, finalInjectableConfiguration);
    };
}

const defaultInjectableConfiguration: IInjectableConfiguration = {
    lifetime: Lifetime.Singleton
};