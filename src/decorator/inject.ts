import { xContainer } from "../container/di-container";
import "reflect-metadata";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Inject(identifier?: string) {
  return function (target: any, propertyKey?: string | symbol, parameterIndex?: number) {
    if (typeof parameterIndex === "number") {
      const resolvedIdentifier = identifier || resolveFromConstructor(target, parameterIndex);
      ApplyConstructorInjection(resolvedIdentifier, target, parameterIndex);
    } else {
      const resolvedIdentifier = identifier || resolveIdentifierFromType(target, propertyKey);
      ApplyPropertyInjection(resolvedIdentifier, target, propertyKey!);
    }
  };
}

function ApplyConstructorInjection(identifier: string, target: any, parameterIndex: number) {
  const existingInjectedParams = Reflect.getMetadata("design:inject", target) || [];
  existingInjectedParams[parameterIndex] = identifier;
  Reflect.defineMetadata("design:inject", existingInjectedParams, target);
}

function ApplyPropertyInjection(identifier: string, target: any, propertyKey: string | symbol) {
  Object.defineProperty(target, propertyKey, {
    get: () => xContainer.resolve(identifier),
    enumerable: true,
    configurable: true,
  });
}


function resolveIdentifierFromType(target: any, propertyKey?: string | symbol): string {
  if (!propertyKey) {
    throw new Error("Property key is required to resolve type metadata.");
  }

  const type = Reflect.getMetadata("design:type", target, propertyKey);
  if (!type) {
    throw new Error(`Type metadata for property ${String(propertyKey)} is not available.`);
  }

  return type.name;
}


function resolveFromConstructor(target: any, parameterIndex: number): string {
  const type = Reflect.getMetadata("design:paramtypes", target)[parameterIndex];
  return type.name;
}