import { defineConfig } from "tsup";

export default defineConfig({
  format: ["cjs", "esm"],
  outDir: "dist",
  entry: ["src/index.ts"],
  dts: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
});