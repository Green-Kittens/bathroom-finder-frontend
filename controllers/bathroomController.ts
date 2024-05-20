import axios from "axios";
import { Facility as BathroomProfile } from "../types/facility";
import { port, host, protocol } from "./env";

/**
 * Function for retrieving all bathrooms
 * @returns {Promise<BathroomProfile[]>} - Returns a promise with all bathrooms after retrieving
 */
export async function getAllBathrooms(): Promise<BathroomProfile[]> {
  try {
    const response = await axios.get<BathroomProfile[]>(
      `${protocol}://${host}:${port}/facilities/`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all bathrooms:", error);
    throw error;
  }
}

/**
 * Function for retrieving a specific bathroom
 * @param {string} facilityId - The ID of the bathroom
 * @returns {Promise<BathroomProfile>} - Returns a promise with bathroom profile information
 */
export async function getBathroomProfile(
  facilityId: string,
): Promise<BathroomProfile> {
  try {
    const response = await axios.get<BathroomProfile>(
      `${protocol}://${host}:${port}/facilities/${facilityId}`, // https for azure and http for running backend locally
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching specific bathroom:", error);
    throw error;
  }
}
