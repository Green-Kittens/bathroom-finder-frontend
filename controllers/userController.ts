import axios from "axios";
import { User as UserProfile } from "../types/user";
import { Facility as BathroomProfile } from "../types/facility";
import { port, host } from "./porthost";

interface Location {
  coordinates: number[];
  type: string;
}

/**
 * Function to register a new user
 * @param {string} username - The user's display name
 * @param {string} email - The email address of the user
 * @param {string} pfpURL - Profile display image
 * @param {string[]} favorites - The user's favorited bathrooms
 * @param {string[]} reviews - The reviews the user has left
 * @param {Date} date - The date the user joined
 * @returns {Promise<string>} - Returns a promise with a success message upon successful registration
 */
export async function registerUser(
  email: string,
  favorites: string[],
  reviews: string[],
  date: Date,
  pfpURL: string,
  username: string,
): Promise<string> {
  try {
    await axios.post<UserProfile>(`http://${host}:${port}/users/`, {
      email: email,
      Favorites: favorites,
      Reviews: reviews,
      DateJoined: date,
      pfpURL: pfpURL,
      DisplayName: username,
    });
    const successsMsg = `${username} successfully created with ${email}.`;
    return successsMsg;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

/**
 * Function to log in a user
 * @param {string} username - The username or email of the user
 * @param {string} password - The password of the user
 * @returns {Promise<string>} - Returns a promise with a success message upon successful login
 */
export async function loginUser(
  username: string,
  password: string,
): Promise<string> {
  // Implementation goes here
  return new Promise<string>((resolve) => {
    const successsMsg = `${username} successfully logged in: ${password}`;

    setTimeout(() => {
      resolve(successsMsg);
    }, 1000);
  });
}

/**
 * Function for forgot password
 * @param {string} email - The email of the user
 * @returns {Promise<string>} - Returns a promise with a success message upon successfully emailing reset password link
 */
export async function forgotPassword(email: string): Promise<string> {
  //Implementation goes here
  return new Promise<string>((resolve) => {
    const successsMsg = `Forgot password link successfully sent to user's email (${email}).`;

    setTimeout(() => {
      resolve(successsMsg);
    }, 1000);
  });
}

/**
 * Function for retrieving user profile information
 * @param {string} userId - The user
 * @returns {Promise<UserProfile>} - Returns a promise with user profile information
 */
export async function getUserProfile(userId: string): Promise<UserProfile> {
  try {
    const response = await axios.get<UserProfile>(
      `http://${host}:${port}/users/${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error retrieving user profile ${userId}:`, error);
    throw error;
  }
}

/**
 * Function for creating a bathroom
 * @param {string} name - Name of the bathroom
 * @param {Location} location - Location of bathroom
 * @param {string} tags - Tags on the bathroom
 * @param {string} operations - Bathroom's hours of operation
 * @param {string[]} reviews - Reviews on bathroom
 * @param {Date} date - Date the bathroom was created/posted
 * @param {string} pictureURL - Picture(s) of the bathroom
 * @param {number} ratingAVG - The rating average of the bathroom
 * @param {number} favorites - The number of favorites the bathroom has
 * @param {number} reports - The number of reports on the bathroom
 * @returns {Promise<string>} - Returns a promise with a success message upon successfully creating a new bathroom
 */
export async function createBathroom(
  name: string,
  location: Location,
  category: string,
  tags: string,
  operations: string,
  reviews: string[],
  date: Date,
  pictureURL: string,
  ratingAVG: number,
  favorites: number,
  reports: number,
): Promise<string> {
  try {
    await axios.post<BathroomProfile>(`http://${host}:${port}/facilities/`, {
      params: {
        Name: name,
        Location: location,
        Category: category,
        Tags: tags,
        Operations: operations,
        Reviews: reviews,
        Date: date,
        PictureURL: pictureURL,
        RatingAVG: ratingAVG,
        Favorites: favorites,
        Reports: reports,
      },
    });
    const successMsg = `Bathroom successfully created: hours of operation (${operations}), tags (${tags})).`;
    return successMsg;
  } catch (error) {
    console.error("Error creating bathroom:", error);
    throw error;
  }
}
