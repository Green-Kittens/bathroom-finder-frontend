const { init, cleanup } = require("detox");

beforeAll(async () => {
  await init();
}, 300000);

afterAll(async () => {
  await cleanup();
});
