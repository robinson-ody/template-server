/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  setupFiles: ['./src/tests/env.ts'],
  setupFilesAfterEnv: ['./src/tests/setup.ts'],
};
