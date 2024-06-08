module.exports = {
  maxWorkers: 1,
  testTimeout: 120000,
  setupFilesAfterEnv: ["<rootDir>/e2e//setup.cjs"],
  rootDir: "..",
  testMatch: ["<rootDir>/e2e/*.test.cjs"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "cjs"],
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  verbose: true,
  reporters: ["detox/runners/jest/reporter"],
  globalSetup: "detox/runners/jest/globalSetup",
  globalTeardown: "detox/runners/jest/globalTeardown",
  testEnvironment: "detox/runners/jest/testEnvironment",
  testPathIgnorePatterns: ["/node_modules/"],
};
