import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  registerUser,
  getUserProfile,
  createBathroom
} from "../userController";
import { port, host } from "../porthost";

describe("registerUser", () => {
  it("should return success msg upon successful user registration", async () => {
    const mock = new MockAdapter(axios);
    const user = {
      id: "1",
      firstname: "undefined",
      lastname: "undefined",
      email: "undefined",
      password: "undefined",
      username: "undefined",
    };
    const success = `${user.username} (${user.firstname},${user.lastname}) successfully created with email (${user.email}), password (${user.password}).`;
    mock.onPost(`http://${host}:${port}/users/`).reply(200, success);

    const result = await registerUser();
    expect(result).toEqual(success);
  });

  it("should handle errors", async () => {
    const mock = new MockAdapter(axios);
    mock.onPost(`http://${host}:${port}/users/`).networkError();

    await expect(registerUser()).rejects.toThrow("Network Error");
  });
});

describe("getUserProfile", () => {
  it("should return user profile", async () => {
    const mock = new MockAdapter(axios);
    const user = {
      id: "1",
      firstname: "undefined",
      lastname: "undefined",
      email: "undefined",
      password: "undefined",
      username: "undefined",
    };
    mock
      .onGet(`http://${host}:${port}/users/${user.username}`)
      .reply(200, user);

    const result = await getUserProfile();
    expect(result).toEqual(user);
  });

  it("should handle errors", async () => {
    const mock = new MockAdapter(axios);
    const user = {
      id: "1",
      firstname: "undefined",
      lastname: "undefined",
      email: "undefined",
      password: "undefined",
      username: "undefined",
    };
    mock.onGet(`http://${host}:${port}/users/${user.username}`).networkError();

    await expect(getUserProfile()).rejects.toThrow("Network Error");
  });
});

describe("createBathroom", (user) => {
  it("should return success msg upon successfully creating a bathroom", async () => {
    const mock = new MockAdapter(axios);
    const bathroom = {
      id: "1",
      name: "bathroom1",
      location: { coordinates: [1], type: "" },
      category: "",
      tags: ["undefined"],
      operations: "undefined",
      date: "",
      ratingAVG: 4,
      favorites: 2,
      reports: 0,
    };
    const success = `Bathroom successfully created by ${user}: hours of operation (${bathroom.operations}), tags (${bathroom.tags})).`;
    mock
      .onPost(`http://${host}:${port}/facilities/`)
      .reply(200, success);

    const result = await createBathroom();
    expect(result).toEqual(success);
  });

  it("should handle errors", async () => {
    const mock = new MockAdapter(axios);
    mock.onPost(`http://${host}:${port}/facilities/`).networkError();

    await expect(createBathroom()).rejects.toThrow("Network Error");
  });
});
