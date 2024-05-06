import axios from "axios";
import { Review } from "../types/review";
import { port, host } from "./porthost";

/**
 * Function for retrieving reviews of a bathroom
 * @param {string} bathroomID - ID of bathroom
 * @returns {Promise<Review[]>} - Returns a promise with all reviews for specific bathroom after retrieving
 */
export async function getAllReviews(bathroomID: string): Promise<Review[]> {
  try {
    const response = await axios.get<Review[]>(
      `http://${host}:${port}/reviews/`,
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching all reviews for bathroom ${bathroomID}:`,
      error,
    );
    throw error;
  }
}

/**
 * Function for creating a review
 * @param {string} useId - The user
 * @param {string} facilityId - The ID of the bathroom
 * @param {string} description - The review
 * @param {int} rating - The user's rating of the bathroom
 * @param {int} likes - the number of likes a reivew has; starts at 0
 * @param {int} dislikes - The number of dislikes a review has; starts at 0
 * @param {Date} date - The date and time the review was uploaded
 * @param {string} pictureURL - User's uploaded images of the bathroom
 * @returns {Promise<string>} - Returns a promise with a success message upon successfully creating a new review
 */
export async function createReview(
  rating: number, 
  likes: number, 
  dislikes: number, 
  pictureURL: string,
  facilityId: string,
  userId: string,
  date: Date,
  description: string
): Promise<string> {
  try {
    await axios.post<Review>(`http://${host}:${port}/reviews/`, {Rating: rating, Likes: likes, Dislikes: dislikes, PictureURL: pictureURL, FacilityID: facilityId, UserId: userId, Date: date, Description: description},
    );
    const successMsg = `Review for bathroom (${facilityId}) successfully created by ${userId}: ${description}`;
    return successMsg;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
}
