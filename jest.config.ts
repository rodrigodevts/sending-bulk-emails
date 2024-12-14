/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import 'reflect-metadata';
import type { JestConfigWithTsJest } from 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';
const { compilerOptions } = require('./tsconfig.json');
const { name } = require('./package.json');

const config: JestConfigWithTsJest = {
  displayName: name,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/modules/**/services/*.ts",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "coverage"
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "json",
    "lcov",
  ],
  preset: '@shelf/jest-mongodb',
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions?.paths, { prefix: '<rootDir>/src' }),
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  setupFiles: [
    '<rootDir>/src/shared/tests/SetupTests.ts'
  ],
};

export default config;
