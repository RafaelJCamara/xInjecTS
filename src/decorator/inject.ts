import { xContainer } from "../container/di-container";
import "reflect-metadata";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Inject(token?: any) {
  return function (target: any, propertyKey?: string | symbol, parameterIndex?: number) {
    if (typeof parameterIndex === "number") {
        if(token){
        token = typeof token === "string" || typeof token === "symbol" ? token : resolveIdentifierFromConstructorType(target, parameterIndex);
      }
      const resolvedToken = token || resolveFromConstructor(target, parameterIndex);
      applyConstructorInjection(resolvedToken, target, parameterIndex);
    } else {
      if(token){
        token = typeof token === "string" ? token : resolveIdentifierFromType(target, propertyKey!);
      }
      const resolvedToken = token || resolveIdentifierFromType(target, propertyKey!);
      applyPropertyInjection(resolvedToken, target, propertyKey!);
    }
  };
}

function applyConstructorInjection(identifier: any, target: any, parameterIndex: number) {
  const existingInjectedParams = Reflect.getMetadata("design:inject", target) || [];
  existingInjectedParams[parameterIndex] = identifier;
  Reflect.defineMetadata("design:inject", existingInjectedParams, target);
}

function applyPropertyInjection(identifier: any, target: any, propertyKey: string | symbol) {
  Object.defineProperty(target, propertyKey, {
    get: () => xContainer.resolve(identifier),
    enumerable: true,
    configurable: true,
  });
}

function resolveFromConstructor(target: any, parameterIndex: number): any {
  const types = Reflect.getMetadata("design:paramtypes", target);
  return types[parameterIndex].name;
}

function resolveIdentifierFromType(target: any, propertyKey: string | symbol): any {
  const type = Reflect.getMetadata("design:type", target, propertyKey);
  return type;
}

function resolveIdentifierFromConstructorType(target: any, parameterIndex: number): any {
  const types = Reflect.getMetadata("design:paramtypes", target);
  return types[parameterIndex].name;
}