import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getAllBathrooms, getBathroomProfile } from "../bathroomController";
import { port, host } from "../porthost";

describe("getAllBathrooms", () => {
  it("should return all bathrooms", async () => {
    const mock = new MockAdapter(axios);
    const bathrooms = [
      {
        id: "1",
        name: "bathroom1",
        location: { coordinates: [1], type: "" },
        category: "",
        tags: [""],
        operations: "",
        date: "",
        ratingAVG: 4,
        favorites: 2,
        reports: 0,
      },
    ];
    mock.onGet(`http://${host}:${port}/facilities/`).reply(200, bathrooms);

    const result = await getAllBathrooms();
    expect(result).toEqual(bathrooms);
  });

  it("should handle errors", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`http://${host}:${port}/facilities/`).networkError();

    await expect(getAllBathrooms()).rejects.toThrow("Network Error");
  });
});

describe("getBathroomProfile", () => {
  it("should return a bathroom profile", async () => {
    const mock = new MockAdapter(axios);
    const bathroomProfile = {
      id: "1",
      name: "bathroom1",
      location: { coordinates: [1], type: "" },
      category: "",
      tags: [""],
      operations: "",
      date: "",
      ratingAVG: 4,
      favorites: 2,
      reports: 0,
    };
    mock
      .onGet(`http://${host}:${port}/facilities/1`)
      .reply(200, bathroomProfile);

    const result = await getBathroomProfile("1");
    expect(result).toEqual(bathroomProfile);
  });

  it("should handle errors", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`http://${host}:${port}/facilities/1`).reply(500);

    await expect(getBathroomProfile("1")).rejects.toThrow(
      "Request failed with status code 500",
    );
  });
});
