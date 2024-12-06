/* eslint-disable @typescript-eslint/no-explicit-any */
import { xContainer } from "../container/di-container";
import 'reflect-metadata';

export function Inject(identifier: string) {
  return function (target: any, propertyKey?: string | symbol, parameterIndex?: number) {
    if (typeof parameterIndex === "number") {
      ApplyConstructorInjection(identifier, target, parameterIndex);
    } else {
      ApplyPropertyInjection(identifier, target, propertyKey!);
    }
  };
}

function ApplyPropertyInjection(identifier: string, target: any, propertyKey: string | symbol){
  Object.defineProperty(target, propertyKey, {
    get: () => xContainer.resolve(identifier),
    enumerable: true,
    configurable: true,
  });
}

function ApplyConstructorInjection(identifier: string, target: any, parameterIndex: number){
  const existingInjectedParams = Reflect.getMetadata('design:inject', target) || [];
  existingInjectedParams[parameterIndex] = identifier;
  Reflect.defineMetadata('design:inject', existingInjectedParams, target);
}