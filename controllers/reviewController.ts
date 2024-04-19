import axios from "axios";
import { Review } from "../types/review";

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

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
 * @param {string} username - The user
 * @param {string} bathroomID - The ID of the bathroom
 * @param {string} description - The review
 * @param {int} rating - The user's rating of the bathroom
 * @param {Date} time - The date and time the review was uploaded
 * @param {Optional<Image>} images - User's uploaded images
 * @returns {Promise<string>} - Returns a promise with a success message upon successfully creating a new review
 */
export async function createReview(
  username: string,
  bathroomID: string,
  description: string,
  rating: number,
  time: Date,
): Promise<string> {
  try {
    await axios.post<Review>(`http://${host}:${port}/reviews/`, {
      params: { username, bathroomID, description, rating, time },
    });
    const successMsg = `Review for bathroom (${bathroomID}) successfully created by ${username}: ${description}, ${rating}, ${time}`;
    return successMsg;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
}
