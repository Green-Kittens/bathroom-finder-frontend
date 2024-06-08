const { init, cleanup } = require("detox");

/* eslint-disable no-undef */
describe("Map Markers Tests", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should display the home screen", async () => {
    await expect(element(by.id("homeScreen"))).toBeVisible();
  });

  it("should display the markers on the map", async () => {
    // Assuming you know the IDs of the markers you want to test
    const markerIDs = [
      "marker-65e3c7599aa3eada64c4c737",
      "marker-6660c5e37fe7ede9e3d3fa41",
      "marker-664e4e507c8663dcb16f56b6",
      "marker-664e4e977c8663dcb16f56b7",
      "marker-665ea5ec0ae4f67a76966059",
      "marker-665f53640ae4f67a76966371",
      "marker-665f69fa0ae4f67a76966450",
      "marker-665f6d740ae4f67a76966485",
      "marker-665f8d6d0ae4f67a769665ed",
      "marker-665faf7f0ae4f67a76966a3e",
      "marker-665fb11be7526aee9ec47d61",
      "marker-665fe9c8ea6e2c50c703d124",
      "marker-665ffbb79b715bb11dc2be03",
      "marker-665ffc429b715bb11dc2be23",
      "marker-665ffc739b715bb11dc2be3d",
      "marker-666082fc7fe7ede9e3d3ad2b",
      "marker-666098e37fe7ede9e3d3c0c4",
      "marker-66609c047fe7ede9e3d3c218",
      "marker-6660bb647fe7ede9e3d3cdf0",
      "marker-6660bd9b7fe7ede9e3d3d43a",
    ]; // Replace with actual IDs

    for (const id of markerIDs) {
      await expect(element(by.id(id))).toBeVisible();
    }
  });

  it("should navigate to facility profile after tapping marker", async () => {
    await element(by.id("marker-664e4e507c8663dcb16f56b6")).tap(); // Replace with actual marker ID
    await expect(element(by.id("facilityProfileScreen"))).toBeVisible(); // Assuming facility profile screen has this testID
  });
});
