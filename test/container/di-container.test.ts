import { xContainer } from './../../src/container/di-container';
import 'reflect-metadata';
import { Lifetime } from '../../src/container/lifetime';
import { IInjectableConfiguration } from '../../src/_shared/injectable.configuration';

class TestService {
    public name = 'TestService';
}

describe('DependencyInjectionContainer', () => {
    beforeEach(() => {
        xContainer['dependencies'].clear();
    });

    it('should register and resolve a singleton dependency', () => {
        const config: IInjectableConfiguration = { lifetime: Lifetime.Singleton, token: 'TestService' };
        xContainer.register(TestService, config);

        const resolvedService1 = xContainer.resolve<TestService>('TestService');
        const resolvedService2 = xContainer.resolve<TestService>('TestService');

        expect(resolvedService1).toBeInstanceOf(TestService);
        expect(resolvedService1).toBe(resolvedService2);
    });

    it('should register and resolve a transient dependency', () => {
        const config: IInjectableConfiguration = { lifetime: Lifetime.Transient, token: 'TestService' };
        xContainer.register(TestService, config);

        const resolvedService1 = xContainer.resolve<TestService>('TestService');
        const resolvedService2 = xContainer.resolve<TestService>('TestService');

        expect(resolvedService1).toBeInstanceOf(TestService);
        expect(resolvedService1).not.toBe(resolvedService2);
    });

    it('should throw an error when resolving an unregistered dependency', () => {
        expect(() => xContainer.resolve<TestService>('UnregisteredService')).toThrow('No dependency found for token: UnregisteredService');
    });
});