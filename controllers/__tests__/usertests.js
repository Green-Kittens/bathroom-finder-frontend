import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { registerUser, loginUser, forgotPassword, getUserProfile, createBathroom } from "../userController";
import {port, host} from "../porthost";

describe("registerUser", () => {
    it("should return success msg upon successful user registration", async () => {
      const mock = new MockAdapter(axios);
      const user = { id: "1", firstname: "undefined", lastname: "undefined", email: "undefined", password: "undefined", username: "undefined"};
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