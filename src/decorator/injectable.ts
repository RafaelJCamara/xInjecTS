/* eslint-disable @typescript-eslint/no-explicit-any */
import { xContainer } from "../container/di-container";

/* eslint-disable @typescript-eslint/no-unsafe-function-type */

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export function Injectable<T extends { new (...args: any[]): {} }>(constructor: T) {
    xContainer.registerDefault(new constructor());
}