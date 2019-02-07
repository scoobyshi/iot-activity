module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  verbose: true,
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  collectCoverageFrom: [
    '**/src/controllers/**/*.ts',
    '**/src/services/**/*.ts',
    '**/src/lib/**/*.ts',
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Jira-Slack Integration',
        outputPath: './dist/test-report.html',
      },
    ],
  ],
};
