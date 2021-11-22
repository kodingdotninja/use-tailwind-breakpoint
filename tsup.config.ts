import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entryPoints: ["src/*.ts"],
  external: ["tailwindcss"],
  format: ["esm", "cjs"],
  splitting: true,
});
