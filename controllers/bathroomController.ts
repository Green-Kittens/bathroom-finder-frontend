import axios, { AxiosError } from "axios";
import { Facility as BathroomProfile } from "../types/facility";
import { port, host, protocol } from "./env";
import { Alert } from "react-native";

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
 * @param {string} FacilityID - The ID of the bathroom
 * @returns {Promise<BathroomProfile>} - Returns a promise with bathroom profile information
 */
export async function getBathroomProfile(
  FacilityID: string,
): Promise<BathroomProfile> {
  try {
    const response = await axios.get<BathroomProfile>(
      `${protocol}://${host}:${port}/facilities/${FacilityID}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching specific bathroom:", error);
    throw error;
  }
}

/**
 * Function for creating a bathroom
 * @param {string} name - Name of the bathroom
 * @param {number[]} coordinates - Location of bathroom
 * @param {string} tags - Tags on the bathroom
 * @param {string} operations - Bathroom's hours of operation
 * @param {string[]} reviews - Reviews on bathroom
 * @param {Date} date - Date the bathroom was created/posted
 * @param {string[]} pictureURL - Picture(s) of the bathroom
 * @param {number} ratingAVG - The rating average of the bathroom
 * @param {number} favorites - The number of favorites the bathroom has
 * @param {number} reports - The number of reports on the bathroom
 * @returns {Promise<string>} - Returns a promise with a success message upon successfully creating a new bathroom
 */
export async function createBathroom(
  name: string,
  coordinates: [number, number],
  category: string,
  tags: string,
  operations: string,
  reviews: string[],
  date: string,
  pictureURL: Promise<string>[],
  ratingAVG: number,
  favorites: number,
  reports: number,
  description: string,
): Promise<string> {
  try {
    const pictures = await Promise.all(pictureURL);
    await axios.post<BathroomProfile>(
      `${protocol}://${host}:${port}/facilities/`,
      {
        Name: name,
        Coordinates: coordinates,
        Category: category,
        Tags: tags,
        Operations: operations,
        Date: date,
        PictureURL: pictures,
        RatingAVG: ratingAVG,
        Favorites: favorites,
        Reports: reports,
        Reviews: reviews,
        Description: description,
      },
    );
    const successMsg = `Bathroom successfully created: hours of operation (${operations}), tags (${tags})).`;
    return successMsg;
  } catch (error) {
    if (error instanceof AxiosError) {
      Alert.alert(
        "AxiosError in createBathroom",
        JSON.stringify(error.toJSON()),
      );
      console.error(error.toJSON());
    } else {
      console.error("Error creating bathroom:", error);
    }
    throw error;
  }
}
