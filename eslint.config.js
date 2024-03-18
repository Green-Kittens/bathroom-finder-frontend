// @ts-check

import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import jest from "eslint-plugin-jest";

export default [
  { ignores: ["dist", ".expo"] },
  eslintPluginPrettierRecommended,
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["components/__tests__/**"],
    ...jest.configs["flat/recommended"],
  },
];
