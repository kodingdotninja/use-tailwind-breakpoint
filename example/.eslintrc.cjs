// @ts-check

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  env: {
    browser: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  ignorePatterns: ["dist", "node_modules"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
  root: true,
};

module.exports = eslintConfig;
