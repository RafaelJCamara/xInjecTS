/* eslint-disable @typescript-eslint/no-explicit-any */

import { InjectionKey } from "../_shared/types";
import { xContainer } from "../container/di-container";
import "reflect-metadata";

export function Inject(token?: any) {
  return function (target: any, propertyKey?: InjectionKey, parameterIndex?: number) {
    if (isInjectionInConstructor(parameterIndex))
        injectInConstructor(token, target, parameterIndex);
    else
        injectInProperty(token, target, propertyKey);
  };
}

function injectInProperty(token: any, target: any, propertyKey?: string) {
  if (token) {
    token = isValidInjectionTokenType(token) ? token : resolveIdentifierFromType(target, propertyKey!);
  }
  const resolvedToken = token || resolveIdentifierFromType(target, propertyKey!);
  applyPropertyInjection(resolvedToken, target, propertyKey!);
}

function injectInConstructor(token: any, target: any, parameterIndex?: number) {
  if (token) {
    token = isValidInjectionTokenType(token) ? token : resolveFromConstructor(target, parameterIndex!);
  }
  const resolvedToken = token || resolveFromConstructor(target, parameterIndex!);
  applyConstructorInjection(resolvedToken, target, parameterIndex!);
}

function isInjectionInConstructor(parameterIndex?: number):boolean{
  return typeof parameterIndex === "number";
}

function isValidInjectionTokenType(token: any) {
  return typeof token === "string";
}

function applyConstructorInjection(identifier: any, target: any, parameterIndex: number) {
  const existingInjectedParams = Reflect.getMetadata("design:inject", target) || [];
  existingInjectedParams[parameterIndex] = identifier;
  Reflect.defineMetadata("design:inject", existingInjectedParams, target);
}

function applyPropertyInjection(identifier: any, target: any, propertyKey: string) {
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

function resolveIdentifierFromType(target: any, propertyKey: string): any {
  const type = Reflect.getMetadata("design:type", target, propertyKey);
  return type.name;
}