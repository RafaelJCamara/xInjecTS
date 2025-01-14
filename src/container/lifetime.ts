
/**
 * Enum representing the lifetime of a service in the dependency injection container.
 * 
 * @enum {number}
 * @property {number} Singleton - A single instance of the service is created and shared.
 * @property {number} Transient - A new instance of the service is created each time it is requested.
 * 
 * @readonly
 */
export enum Lifetime{
    Singleton,
    Transient
}