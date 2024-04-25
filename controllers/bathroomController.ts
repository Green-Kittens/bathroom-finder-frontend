import axios from "axios";
import { Facility as BathroomProfile } from "../types/facility";
import {port, host} from "./porthost";

/**
 * Function for retrieving all bathrooms
 * @returns {Promise<BathroomProfile[]>} - Returns a promise with all bathrooms after retrieving
 */
export async function getAllBathrooms(): Promise<BathroomProfile[]> {
  try {
    const response = await axios.get<BathroomProfile[]>(
      `http://${host}:${port}/facilities/`,
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
      `http://${host}:${port}/facilities/${bathroomID}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching specific bathroom:", error);
    throw error;
  }
}
