import axios from "axios";
import { User as UserProfile } from "../types/user";
import { Facility as BathroomProfile } from "../types/facility";

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

/**
 * Function to register a new user
 * @param {string} firstname - The first name of the user
 * @param {string} lastname - The last name of the user
 * @param {string} username - The username of the user
 * @param {string} email - The email address of the user
 * @param {string} password - The password of the user *encrypted
 * @param {string} profile - Profile display image
 * @returns {Promise<string>} - Returns a promise with a success message upon successful registration
 */
export async function registerUser(
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string,
  profile: string,
): Promise<string> {
  try {
    await axios.post<UserProfile>(`http://${host}:${port}/users/`, {
      params: { firstname, lastname, username, email, password, profile },
    });
    const successsMsg = `${username} (${firstname},${lastname}) successfully created with email (${email}), password (${password}), and profile ${profile}.`;
    return successsMsg;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

/**
 * Function to log in a user
 * @param {string} user - The username or email of the user
 * @param {string} password - The password of the user
 * @returns {Promise<string>} - Returns a promise with a success message upon successful login
 */
export async function loginUser(
  user: string,
  password: string,
): Promise<string> {
  // Implementation goes here
  return new Promise<string>((resolve) => {
    const successsMsg = `${user} successfully logged in: ${password}`;

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
 * @param {string} username - The user
 * @returns {Promise<UserProfile>} - Returns a promise with user profile information
 */
export async function getUserProfile(username: string): Promise<UserProfile> {
  try {
    const response = await axios.get<UserProfile>(
      `http://${host}:${port}/users/${username}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error retrieving user profile ${username}:`, error);
    throw error;
  }
}

/**
 * Function for creating a bathroom
 * @param {string} username - The user
 * @param {string} opHours - The hours of operation of the bathroom (days and times)
 * @param {Optional<string>} description - Description of the bathroom
 * @param {string[]} tags - List of tags to filter the bathroom by
 * @param {string} image - Uploaded images of the bathroom
 * @returns {Promise<string>} - Returns a promise with a success message upon successfully creating a new bathroom
 */
export async function createBathroom(
  username: string,
  openHr: Date,
  closeHr: Date,
  description: string,
  tags: string[],
  image: string,
): Promise<string> {
  try {
    await axios.post<BathroomProfile>(`http://${host}:${port}/facilities/`, {
      params: { username, openHr, closeHr, description, tags, image },
    });
    const successMsg = `Bathroom successfully created by ${username}: hours of operation (${openHr} to ${closeHr}), description (${description}), tags (${tags}), images (${images})`;
    return successMsg;
  } catch (error) {
    console.error("Error creating bathroom:", error);
    throw error;
  }
}
