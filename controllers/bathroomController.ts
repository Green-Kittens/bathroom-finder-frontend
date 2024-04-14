import axios from "axios";
import { Facility as BathroomProfile } from "@/types/facility";

const port = process.env.PORT || 8081;

/**
 * Function for retrieving all bathrooms
 * @returns {Promise<BathroomProfile[]>} - Returns a promise with all bathrooms after retrieving
 */
export async function getAllBathrooms(): Promise<BathroomProfile[]> {
  try {
    const response = await axios.get<BathroomProfile[]>(
      `http:localhost:${port}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all bathrooms:", error);
    throw error;
  }
}

/**
 * Function for retrieving a specific bathroom
 * @param {string} bathroomID - The ID of the bathroom
 * @returns {Promise<BathroomProfile>} - Returns a promise with bathroom profile information
 */
export async function getBathroomProfile(
  bathroomID: string,
): Promise<BathroomProfile> {
  try {
    const response = await axios.get<BathroomProfile>(
      `http:localhost:${port}/${bathroomID}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all bathrooms:", error);
    throw error;
  }
}

/**
 * Function for filtering bathrooms to look for specific type of bathrooms
 * @param {Optional<int>} location - Location of user
 * @param {List<string>} tags - The tags used to filter bathroom types
 * @returns {Promise<List<BathroomProfile>>} - Returns a promise with all bathrooms of certain type(s) after retrieving
 */
export async function getSomeBathrooms(
  location: { coordinates: [1]; type: "" },
  tags: string[],
): Promise<BathroomProfile[]> {
  //Implementation goes here
  return new Promise<BathroomProfile[]>((resolve) => {
    const filteredBathrooms: BathroomProfile[] = [
      {
        id: "1",
        name: "Bathroom 1",
        location: location,
        category: "",
        tags: tags,
        operations: "",
        date: "",
        ratingAVG: 4,
        favorites: 1,
        reports: 0,
      },
    ];

    setTimeout(() => {
      resolve(filteredBathrooms);
    }, 1000);
  });
}

/**
 * Function for reporting a bathroom
 * @param {string} bathroomID - The ID of the bathroom
 * @param {string} username - The user
 * @param {string} report - The report of the user
 * @return {Promise<string>} - Returns a promise with a success message upon successfully reporting a bathroom
 */
export async function reportBathroom(
  bathroomID: string,
  username: string,
  report: string,
): Promise<string> {
  //Implemnentation goes here
  return new Promise<string>((resolve) => {
    const successsMsg = `Bathroom (${bathroomID}) successfully reported by ${username}: ${report}`;

    setTimeout(() => {
      resolve(successsMsg);
    }, 1000);
  });
}

/**
 * Function for favoriting a bathroom
 * @param {string} bathroomID - The ID of the bathroom
 * @param {string} username - The user
 * @return {Promise<string>} - Returns a promise with a success message upon successfully favoriting a bathroom
 */
export async function favoriteBathroom(
  bathroomID: string,
  username: string,
): Promise<string> {
  //Implemnentation goes here
  return new Promise<string>((resolve) => {
    const successsMsg = `Bathroom (${bathroomID})successfully favorited by ${username}`;

    setTimeout(() => {
      resolve(successsMsg);
    }, 1000);
  });
}
