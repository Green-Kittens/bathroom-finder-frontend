import axios from "axios";
import { User as UserProfile } from "../types/user";
// import { Facility as BathroomProfile } from "../types/facility";
import { port, host, protocol } from "./env";

/**
 * Function to register a new user
 * @param {string} DisplayName - The user's display name
 * @param {string} Email - The email address of the user
 * @param {string} PictureURL - Profile display image
 * @param {string[]} Favorites - The user's favorited bathrooms
 * @param {string[]} Reviews - The reviews the user has left
 * @param {Date} Date - The date the user joined
 * @returns {Promise<string>} - Returns a promise with a success message upon successful registration
 */
export async function registerUser(
  Email: string,
  Favorites: string[],
  Reviews: string[],
  Date: Date,
  PictureURL: string,
  DisplayName: string,
): Promise<string> {
  try {
    await axios.post<UserProfile>(`${protocol}://${host}:${port}/users/`, {
      email: Email,
      Favorites: Favorites,
      Reviews: Reviews,
      DateJoined: Date,
      pfpURL: PictureURL,
      DisplayName: DisplayName,
    });
    const successsMsg = `${DisplayName} successfully created with ${Email}.`;
    return successsMsg;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

/**
 * Function for retrieving user profile information
 * @param {string} UserID - The user
 * @returns {Promise<UserProfile>} - Returns a promise with user profile information
 */
export async function getUserProfile(UserID: string): Promise<UserProfile> {
  try {
    const response = await axios.get<UserProfile>(
      `${protocol}://${host}:${port}/users/${UserID}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error retrieving user profile ${UserID}:`, error);
    throw error;
  }
}

