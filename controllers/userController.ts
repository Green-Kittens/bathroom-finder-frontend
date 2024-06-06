import axios from "axios";
import { User as UserProfile } from "../types/user";
import { port, host, protocol } from "./env";

/**
 * Function to register a new user
 * @param {string} UserID - The user's ID
 * @param {string} DisplayName - The user's display name
 * @param {string} Email - The email address of the user
 * @param {string} PictureURL - Profile display image
 * @param {string[]} Favorites - The user's favorited bathrooms
 * @param {string[]} Reviews - The reviews the user has left
 * @param {Date} DateJoined - The date the user joined
 * @returns {Promise<string>} - Returns a promise with a success message upon successful registration
 */
export async function registerUser(
  UserID: string,
  Email: string,
  Favorites: string[],
  Reviews: string[],
  DateJoined: Date,
  PictureURL: string,
  DisplayName: string,
): Promise<string> {
  try {
    const userData = {
      UserID,
      Email,
      Favorites,
      Reviews,
      DateJoined,
      PictureURL,
      DisplayName,
    };

    const response = await axios.post<UserProfile>(
      `${protocol}://${host}:${port}/users/`,
      userData,
    );
    console.log("User data sent successfully:", response.data);

    const successMsg = `${DisplayName} successfully created with ${Email}.`;
    return successMsg;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error creating user:", error.message);
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
    } else {
      console.error("Unknown error creating user:", error);
    }
    throw error;
  }
}

/**
 * Function for retrieving user profile information
 * @param {string} UserID - The user ID
 * @returns {Promise<UserProfile | null>} - Returns a promise with user profile information or null if not found
 */
export async function getUserProfile(
  UserID: string,
): Promise<UserProfile | null> {
  try {
    const response = await axios.get<UserProfile>(
      `${protocol}://${host}:${port}/users/${UserID}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    console.error(`Error retrieving user profile ${UserID}:`, error);
    throw error;
  }
}
