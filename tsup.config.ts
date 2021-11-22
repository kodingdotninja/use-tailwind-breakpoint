import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entryPoints: ["src/*.ts"],
  format: ["esm", "cjs"],
  splitting: true,
});
