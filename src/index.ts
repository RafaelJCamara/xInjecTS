import { Inject } from "./decorator/inject";
import { Injectable } from "./decorator/injectable";

    @Injectable()
    class ServiceA{

    }

    class TestClass {
        @Inject()
        testProperty!: ServiceA;
    }

    new TestClass();
