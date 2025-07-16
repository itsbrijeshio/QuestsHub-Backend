import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/jest.setup.ts"], // 👈 this runs before tests
  testMatch: ["**/tests/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js"],
  roots: ["<rootDir>/tests"],
  clearMocks: true,
  testTimeout: 15000,
  coverageDirectory: "coverage",
  verbose: true,
};

export default config;
