/* eslint-disable @typescript-eslint/no-explicit-any */

import { IInjectableConfiguration } from "../_shared/injectable.configuration";
import { GenericConstructor, InjectionKey } from "../_shared/types";
import { IDependency } from "./dependency";
import { Lifetime } from "./lifetime";

class DependencyInjectionContainer {
    private readonly dependencies = new Map<InjectionKey, IDependency>();

    /**
     * Registers a dependency in the DI container.
     *
     * @template T - The type of the instance to register, which extends `GenericConstructor`.
     * @param {T} instance - The instance of the dependency to register.
     * @param {IInjectableConfiguration} dependencyConfiguration - The configuration for the dependency.
     * @throws {Error} If a dependency with the same token is already registered.
     * @throws {Error} If a factory is used with a non-singleton lifetime.
     */
    register<T extends GenericConstructor>(instance: T, dependencyConfiguration: Partial<IInjectableConfiguration> = {}) {
      const finalInjectableConfiguration = { ...defaultInjectableConfiguration, ...dependencyConfiguration };

      const token = finalInjectableConfiguration.token ?? (new instance() as any).constructor.name;
      if (this.dependencies.has(token)) {
        throw new Error(`Dependency with token ${token} is already registered`);
      }

      if(finalInjectableConfiguration.lifetime !== Lifetime.Singleton && finalInjectableConfiguration.useFactory){
        throw new Error("You can only use a factory with singleton lifetime.");
      }

      const dependency = {
          value: this.getInstanceToResolve(finalInjectableConfiguration, instance),
          lifetime: finalInjectableConfiguration.lifetime!
      };

      this.dependencies.set(
          token, 
          dependency
      );

      if(dependencyConfiguration.resolvedBy){
        this.dependencies.set(
          dependencyConfiguration.resolvedBy, 
          dependency
        );
      }
    }
  
    /**
     * Resolves a dependency based on the provided identifier.
     *
     * @template T - The type of the dependency to resolve.
     * @param {InjectionKey | Constructor<T>} dependencyIdentifier - The identifier of the dependency to resolve. 
     * This can either be a string key or a constructor function.
     * @returns {T} - The resolved dependency instance.
     */
    resolve<T>(dependencyIdentifier: InjectionKey | Constructor<T>) : T{
      return typeof dependencyIdentifier === 'string' ? 
        this.resolveProperty<T>(dependencyIdentifier) :
        this.resolveCtor<T>(dependencyIdentifier as  Constructor<T>);
    }


    private resolveProperty<T>(token: InjectionKey): T {
      const dependency = this.dependencies.get(token);
      if (!dependency) {
        throw new Error(`No dependency found for token: ${String(token)}`);
      }

      return  dependency.lifetime === Lifetime.Singleton?  dependency.value : new dependency.value();
    }

    private resolveCtor<T>(constructor: Constructor<T>): T {
      const tokens: InjectionKey[] = Reflect.getMetadata('design:inject', constructor) || [];
      const args = tokens.map((token) => {
        const dependency = this.dependencies.get(token);
        if (!dependency) {
          throw new Error(`No dependency found for token: ${String(token)}`);
        }
        return dependency.lifetime === Lifetime.Singleton?  dependency.value : new dependency.value();
      });
      return new constructor(...args);
    }

    private getInstanceToResolve<T extends GenericConstructor>(dependencyConfiguration: IInjectableConfiguration, instance: T) {
      let instanceToResolve: any;

      if (dependencyConfiguration.lifetime === Lifetime.Singleton) {
        instanceToResolve = dependencyConfiguration.useFactory ? dependencyConfiguration.useFactory() : new instance();
      } else {
        instanceToResolve = dependencyConfiguration.useFactory ? dependencyConfiguration.useFactory : instance;
      }
      return instanceToResolve;
    }
  }
  
type Constructor<T = any> = new (...args: any[]) => T;

const defaultInjectableConfiguration: IInjectableConfiguration = {
    lifetime: Lifetime.Singleton
};

/**
 * The `xContainer` is an instance of the `DependencyInjectionContainer` class.
 * It serves as the main container for managing dependency injection within the application.
 */
export const xContainer = new DependencyInjectionContainer();