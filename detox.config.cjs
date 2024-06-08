const { reloadApp } = require("detox-expo-helpers");

module.exports = {
  testRunner: {
    runner: "jest",
    options: {
      config: "e2e/jest.config.cjs",
      setupTimeout: 120000,
    },
  },
  apps: {
    "ios.debug": {
      type: "ios.app",
      binaryPath:
        "ios/build/Build/Products/Debug-iphonesimulator/bathroomfinderfrontend.app",
      build:
        "xcodebuild -workspace ios/bathroomfinderfrontend.xcworkspace -scheme bathroomfinderfrontend -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build",
    },
  },
  devices: {
    "ios.simulator": {
      type: "ios.simulator",
      device: {
        name: "iPhone 15 Pro Max", // Use the name of the device
      },
    },
  },
  configurations: {
    "ios.sim.debug": {
      device: "ios.simulator",
      app: "ios.debug",
    },
  },
};
