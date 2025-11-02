import js from "@eslint/js";
import jest from "eslint-plugin-jest";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...jest.environments.globals.globals,
        NodeJS: true,
      },
    },
    plugins: {
      jest,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...jest.configs.recommended.rules,

      "jest/no-disabled-tests": "warn",
      "jest/no-conditional-expect": "error",
      "jest/no-identical-title": "error",
    },
  },
];
