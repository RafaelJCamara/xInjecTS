/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import { Injectable } from '../../src/decorator/injectable';
import { xContainer } from '../../src/container/di-container';
import { Lifetime } from '../../src/container/lifetime';

describe('Injectable Decorator', () => {
    beforeEach(() => {
        xContainer["dependencies"].clear();
    });

    it('should register a class with default configuration', () => {
        @Injectable()
        class TestClass {}

        const registration1 = xContainer.resolve(TestClass);
        expect(registration1).toBeDefined();
        expect(registration1).toBeInstanceOf(TestClass);

        const registration2 = xContainer.resolve(TestClass);
        expect(registration2).toBeDefined();
        expect(registration2).toBeInstanceOf(TestClass);

        expect(registration1).not.toBe(registration2);
    });

    it('should register a class default lifetime and custom token', () => {
        @Injectable({
            token: "CustomToken"
        })
        class TestClass {}

        const registration1 = xContainer.resolve("CustomToken");
        expect(registration1).toBeDefined();
        expect(registration1).toBeInstanceOf(TestClass);
    });

    it('should register a class with Singleton configuration and default token', () => {
        @Injectable({
            lifetime: Lifetime.Singleton
        })
        class TestClass {}

        const registration1 = xContainer.resolve(TestClass);
        expect(registration1).toBeDefined();
        expect(registration1).toBeInstanceOf(TestClass);

        const registration2 = xContainer.resolve(TestClass);
        expect(registration2).toBeDefined();
        console.log("Same reference: ", registration1 === registration2);
    });

    it('should throw an error if the class is already registered', () => {
        @Injectable()
        class TestClass {}

        expect(() => {
            @Injectable()
            class TestClass {}
        }).toThrow("Dependency with token TestClass is already registered");
    });
});