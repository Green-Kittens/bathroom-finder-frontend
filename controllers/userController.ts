import axios from "axios";
import { User as UserProfile } from "../types/user";
import { Facility as BathroomProfile } from "../types/facility";
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

/**
 * Function for creating a bathroom
 * @param {string} Name - Name of the bathroom
 * @param {number[]} Coordinates - Location of bathroom
 * @param {string} Tags - Tags on the bathroom
 * @param {string} Operations - Bathroom's hours of operation
 * @param {string[]} Reviews - Reviews on bathroom
 * @param {Date} Date - Date the bathroom was created/posted
 * @param {string[]} PictureURL - Picture(s) of the bathroom
 * @param {number} RatingAVG - The rating average of the bathroom
 * @param {number} Favorites - The number of favorites the bathroom has
 * @param {number} Reports - The number of reports on the bathroom
 * @returns {Promise<string>} - Returns a promise with a success message upon successfully creating a new bathroom
 */
export async function createBathroom(
  Name: string,
  Coordinates: [number, number],
  Category: string,
  Tags: string[],
  Operations: string,
  Reviews: string[],
  Date: string,
  PictureURL: string[],
  RatingAVG: number,
  Favorites: number,
  Reports: number,
  Description: string,
): Promise<string> {
  try {
    await axios.post<BathroomProfile>(
      `${protocol}://${host}:${port}/facilities/`,
      {
        params: {
          Name: Name,
          Coordinates: Coordinates,
          Category: Category,
          Tags: Tags,
          Operations: Operations,
          Reviews: Reviews,
          Date: Date,
          PictureURL: PictureURL,
          RatingAVG: RatingAVG,
          Favorites: Favorites,
          Reports: Reports,
          Description: Description,
        },
      },
    );
    const successMsg = `Bathroom successfully created: hours of operation (${Operations}), tags (${Tags})).`;
    return successMsg;
  } catch (error) {
    console.error("Error creating bathroom:", error);
    throw error;
  }
}
