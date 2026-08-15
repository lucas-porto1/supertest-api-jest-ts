/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverageFrom: ['config/**/*.ts', 'core/**/*.ts', 'endpoints/**/*.ts', 'test-data/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text', 'html', 'lcov'],
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        filename: 'index.html',
        inlineSource: true,
        openReport: false,
        pageTitle: 'Supertest API Test Report',
        publicPath: './reports',
      },
    ],
  ],
  restoreMocks: true,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.spec.ts'],
  testTimeout: 10000,
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json', useESM: true }],
  },
  verbose: true,
};

export default config;
