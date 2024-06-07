const { reloadApp } = require("detox-expo-helpers");

module.exports = {
  testRunner: {
    runner: "jest",
    options: {
      config: "e2e/jest.config.js",
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
    "android.debug": {
      type: "android.apk",
      binaryPath: "android/app/build/outputs/apk/debug/app-debug.apk",
      build:
        "cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..",
    },
  },
  devices: {
    "ios.simulator": {
      type: "ios.simulator",
      device: {
        type: "iPhone 11", // specify the device name within the ios.simulator type
      },
    },
    "android.emulator": {
      type: "android.emulator",
      device: {
        avdName: "Pixel_3a_API_30_x86",
      },
    },
  },
  configurations: {
    "ios.sim.debug": {
      device: "ios.simulator",
      app: "ios.debug",
    },
    "android.emu.debug": {
      device: "android.emulator",
      app: "android.debug",
    },
  },
};
