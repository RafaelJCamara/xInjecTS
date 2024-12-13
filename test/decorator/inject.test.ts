/* eslint-disable @typescript-eslint/no-empty-object-type */
import "reflect-metadata";
import { Inject } from "../../src/decorator/inject";
import { xContainer } from "../../src/container/di-container";
import { Injectable } from "../../src/decorator/injectable";


describe("@Inject Decorator", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        xContainer["dependencies"].clear();
    });

    it("should inject dependency via constructor", () => {
        @Injectable()
        class Dependency {}
        class TestClass {
            constructor(@Inject() public dep: Dependency) {}
        }

        const testClass = xContainer.resolve(TestClass);

        expect(testClass).toBeDefined();
        expect(testClass).toBeInstanceOf(TestClass);
        expect(testClass.dep).toBeDefined();
        expect(testClass.dep).toBeInstanceOf(Dependency);
    });

    it("should inject dependency via parameter", () => {
        @Injectable()
        class Dependency {}
        class TestClass {
            @Inject() dep!: Dependency
        }

        jest.spyOn(xContainer, "resolve");

        const testClass = new TestClass();

        expect(testClass.dep).toBeDefined();
        expect(testClass.dep).toBeInstanceOf(Dependency);
        expect(xContainer.resolve).toHaveBeenCalledWith(Dependency);
    });

    it("should inject dependency via parameter with custom token", () => {
        @Injectable({
            token: "CustomToken"
        })
        class Dependency {}

        class TestClass {
            @Inject("CustomToken") dep!: Dependency
        }

        jest.spyOn(xContainer, "resolve");

        const testClass = new TestClass();

        expect(testClass.dep).toBeDefined();
        expect(testClass.dep).toBeInstanceOf(Dependency);
        expect(xContainer.resolve).toHaveBeenCalledWith("CustomToken");
    });

    it("should inject dependency resolved by interface", () => {
        interface IDependency{}

        @Injectable({
            resolvedBy: "IDependency"
        })
        class Dependency implements IDependency{}

        class TestClass {
            @Inject("IDependency")
            dep!: IDependency;
        }

        jest.spyOn(xContainer, "resolve");

        const testClass = new TestClass();

        expect(testClass.dep).toBeDefined();
        expect(testClass.dep).toBeInstanceOf(Dependency);
        expect(xContainer.resolve).toHaveBeenCalledWith("IDependency");
    });
});