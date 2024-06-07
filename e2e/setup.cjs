const { init, cleanup } = require("detox");
const config = require("../.detox.config.cjs");

beforeAll(async () => {
  await init(config);
}, 300000);

afterAll(async () => {
  await cleanup();
});
