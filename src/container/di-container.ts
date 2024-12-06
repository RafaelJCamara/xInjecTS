import { IDependency } from "./dependency";
import { Lifetime } from "./lifetime";

/* eslint-disable @typescript-eslint/no-explicit-any */
class DependencyInjectionContainer {
    private dependencies = new Map<string, IDependency>();

    registerDefault<T>(instance: T) {
      this.dependencies.set((instance as any).constructor.name, {
        value: instance,
        lifetime: Lifetime.Scoped,
      });
    }

    register<T>(token: string, instance: T) {
      this.dependencies.set(token, {
        value: instance,
        lifetime: Lifetime.Scoped
      });
    }
  
    resolve<T>(token: string): T {
      //TODO: Implement nested lifetime checks

      const dependency = this.dependencies.get(token);
      if (!dependency) {
        throw new Error(`No dependency found for token: ${token}`);
      }
      return dependency.value;
    }

    resolveCtor<T>(constructor: Constructor<T>): T {
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