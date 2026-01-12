import type { Config } from "jest";
import nextJest from "next/jest.js";

const customJestConfig: Config = {
  coverageProvider: "v8",
  collectCoverage: true,
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
};

const createJestConfig = nextJest({
  dir: "./",
});

const jestConfig = async () => {
  const nextJestConfig = await createJestConfig(customJestConfig)();
  return {
    ...nextJestConfig,
    moduleNameMapper: {
      // Workaround to put our SVG mock first
      "\\.svg$": "<rootDir>/__mocks__/svg.tsx",
      "^next-intl/server$": "<rootDir>/__mocks__/next-intl.tsx",
      "^next-intl$": "<rootDir>/__mocks__/next-intl.tsx",
      ...nextJestConfig.moduleNameMapper,
    },
  };
};

export default jestConfig;
