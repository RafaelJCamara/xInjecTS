/* eslint-disable @typescript-eslint/no-empty-object-type */
import { IInjectableConfiguration } from "../_shared/injectable.configuration";
import { GenericConstructor } from "../_shared/types";
import { IDependency } from "./dependency";
import { Lifetime } from "./lifetime";

/* eslint-disable @typescript-eslint/no-explicit-any */
class DependencyInjectionContainer {
    private dependencies = new Map<string, IDependency>();

    register<T extends GenericConstructor>(instance: T, dependencyConfiguration: IInjectableConfiguration) {
      const dependency = {
          value: dependencyConfiguration.lifetime === Lifetime.Singleton ? new instance() : instance,
          lifetime: dependencyConfiguration.lifetime ?? Lifetime.Scoped
      };

      this.dependencies.set(
          dependencyConfiguration.token ?? (new instance() as any).constructor.name, 
          dependency
      );

      if(dependencyConfiguration.resolvedBy){
        this.dependencies.set(
          dependencyConfiguration.resolvedBy, 
          dependency
        );
      }
    }
  
    resolve<T>(dependencyIdentifier: string | Constructor<T>) : T{
      return typeof dependencyIdentifier === 'string' ? 
        this.resolveProperty<T>(dependencyIdentifier) :
        this.resolveCtor<T>(dependencyIdentifier);
    }

    private resolveProperty<T>(token: string): T {
      //TODO: Implement nested lifetime checks

      const dependency = this.dependencies.get(token);
      if (!dependency) {
        throw new Error(`No dependency found for token: ${token}`);
      }

      return  dependency.lifetime === Lifetime.Singleton?  dependency.value : new dependency.value();
    }

    private resolveCtor<T>(constructor: Constructor<T>): T {
      //TODO: Implement nested lifetime checks
      
      const tokens: string[] = Reflect.getMetadata('design:inject', constructor) || [];
      const args = tokens.map((token) => {
        const dependency = this.dependencies.get(token);
        if (!dependency) {
          throw new Error(`No dependency found for token: ${token}`);
        }
        return dependency.lifetime === Lifetime.Singleton?  dependency.value : new dependency.value();
      });
      return new constructor(...args);
    }
  }
  
type Constructor<T = any> = new (...args: any[]) => T;

export const xContainer = new DependencyInjectionContainer();