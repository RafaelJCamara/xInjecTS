import { IDependency } from "./dependency";
import { Lifetime } from "./lifetime";

/* eslint-disable @typescript-eslint/no-explicit-any */
class DependencyInjectionContainer {
    private dependencies = new Map<string, IDependency>();

    register<T>(instance: T, token?: string, lifetime?: Lifetime) {
      this.dependencies.set(
        token ?? (instance as any).constructor.name, 
        {
          value: instance,
          lifetime: lifetime ?? Lifetime.Transient
        }
      );
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
      return dependency.value;
    }

    private resolveCtor<T>(constructor: Constructor<T>): T {
      //TODO: Implement nested lifetime checks
      
      const tokens: string[] = Reflect.getMetadata('design:inject', constructor) || [];
      const args = tokens.map((token) => {
        const dependency = this.dependencies.get(token);
        if (!dependency) {
          throw new Error(`No dependency found for token: ${token}`);
        }
        return dependency.value;
      });
      return new constructor(...args);
    }

  }

  type Constructor<T = any> = new (...args: any[]) => T;
  
  export const xContainer = new DependencyInjectionContainer();