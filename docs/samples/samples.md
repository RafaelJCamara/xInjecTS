<h1 align="center">
  samples
</h1>

## Structure

Inside the `src` folder, each folder that you'll find corresponds to a specific type of sample.

Here's a simple explanation of the folders:
| Folder | Description |
| ----------- | ----------- |
| container | Explores how to use the dependency injection container directly. |
| factory | Explores how to enable the usage of factories when it comes to creating dependencies. |
| interfaces | How to enable solving dependencies based on interfaces, therefore complying with principles such as the Dependency Inversion Principle. |
| singleton | Showcases the Singleton dependency lifetime. |
| transient | Showcases the Transient dependency lifetime. |


## How to run the code
1. Run `npm install`
2. Run `npx ts-node path/to/sample/ts/file`, where `path/to/sample/ts/file` is the sample TypeScript file. As an example: `npx ts-node src/singleton/index.ts`.