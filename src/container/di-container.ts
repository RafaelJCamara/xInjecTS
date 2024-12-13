/* eslint-disable @typescript-eslint/no-empty-object-type */
import { IInjectableConfiguration } from "../_shared/injectable.configuration";
import { GenericConstructor, InjectionKey } from "../_shared/types";
import { IDependency } from "./dependency";
import { Lifetime } from "./lifetime";

/* eslint-disable @typescript-eslint/no-explicit-any */
class DependencyInjectionContainer {
    private readonly dependencies = new Map<InjectionKey, IDependency>();

    register<T extends GenericConstructor>(instance: T, dependencyConfiguration: IInjectableConfiguration) {
      const token = dependencyConfiguration.token ?? (new instance() as any).constructor.name;
      if (this.dependencies.has(token)) {
        throw new Error(`Dependency with token ${token} is already registered`);
      }

      const dependency = {
          value: dependencyConfiguration.lifetime === Lifetime.Singleton ? new instance() : instance,
          lifetime: dependencyConfiguration.lifetime
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
  
    resolve<T>(dependencyIdentifier: InjectionKey | Constructor<T>) : T{
      return typeof dependencyIdentifier === 'string' ? 
        this.resolveProperty<T>(dependencyIdentifier) :
        this.resolveCtor<T>(dependencyIdentifier as  Constructor<T>);
    }

    private resolveProperty<T>(token: InjectionKey): T {
      //TODO: Implement nested lifetime checks

      const dependency = this.dependencies.get(token);
      if (!dependency) {
        throw new Error(`No dependency found for token: ${String(token)}`);
      }

      return  dependency.lifetime === Lifetime.Singleton?  dependency.value : new dependency.value();
    }

    private resolveCtor<T>(constructor: Constructor<T>): T {
      //TODO: Implement nested lifetime checks
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
  }
  
type Constructor<T = any> = new (...args: any[]) => T;

export const xContainer = new DependencyInjectionContainer();