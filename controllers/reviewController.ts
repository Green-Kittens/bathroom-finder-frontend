import axios, { AxiosError } from "axios";
import { Review } from "../types/review";
import { port, host, protocol } from "./env";
import { Alert } from "react-native";

/**
 * Function for retrieving reviews of a bathroom
 * @param {string} FacilityID - ID of bathroom
 * @returns {Promise<Review[]>} - Returns a promise with all reviews for specific bathroom after retrieving
 */
export async function getAllReviews(FacilityID: string): Promise<Review[]> {
  try {
    const response = await axios.get<Review[]>(
      `${protocol}://${host}:${port}/reviews/`,
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching all reviews for bathroom ${FacilityID}:`,
      error,
    );
    throw error;
  }
}

/**
 * Function for creating a review
 * @param {string} UserID - The user
 * @param {string} FacilityID - The ID of the bathroom
 * @param {string} Description - The review
 * @param {int} Rating - The user's rating of the bathroom
 * @param {int} Likes - the number of likes a reivew has; starts at 0
 * @param {int} Dislikes - The number of dislikes a review has; starts at 0
 * @param {Date} Date - The date and time the review was uploaded
 * @param {string[]} PictureURL - User's uploaded images of the bathroom
 * @returns {Promise<string>} - Returns a promise with a success message upon successfully creating a new review
 */
export async function createReview(
  rating: number,
  likes: number,
  dislikes: number,
  pictureURL: string[],
  facilityID: string,
  userID: string,
  date: string,
  description: string,
): Promise<string> {
  try {
    await axios.post<Review>(`${protocol}://${host}:${port}/reviews/`, {
      Rating: rating,
      Likes: likes,
      Dislikes: dislikes,
      PictureURL: pictureURL,
      FacilityID: facilityID,
      UserID: userID,
      Date: date,
      Description: description,
    },
  );
    const successMsg = `Review for bathroom (${facilityID}) successfully created by ${userID}: ${description}`;
    return successMsg;
  } catch (error) {
    if (error instanceof AxiosError) {
      Alert.alert("AxiosError", JSON.stringify(error.toJSON()));
      console.error(error.toJSON());
    } else {
      console.error("Error creating bathroom:", error);
    }
    throw error;
  }
}
