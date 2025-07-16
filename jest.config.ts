import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/jest.setup.ts"], // 👈 this runs before tests
  testMatch: ["**/tests/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js"],
  roots: ["<rootDir>/tests"],
  clearMocks: true,
  coverageDirectory: "coverage",
  verbose: true,
};

export default config;
