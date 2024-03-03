/**
 * Function for retrieving reviews of a bathroom
 * @param {string} bathroomID - ID of bathroom
 * @returns {Promise<string>} - Returns a promise with a success message after retrieving all reviews for specific bathroom
 */
async function getAllReviews(bathroomID: string): Promise<string> {
  //Implementation goes here
}

/**
 * Function for creating a review
 * @param {string} userID - The ID of the user
 * @param {string} bathroomID - The ID of the bathroom
 * @param {int} rating - The user's rating of the bathroom
 * @param {Date} time - The date and time the review was uploaded
 * @param {Image} images - *Optional images
 * @returns {Promise<string>} - Returns a promise with a success message upon successfully creating a new review
 */
async function createReview(
  userID: string,
  bathroomID: string,
  rating: Int16Array,
  time: Date,
  images: typeof Image
): Promise<string> {
  //Implementation goes here
}

/**
 * Function for liking a review
 * @param {string} reviewID - The ID of the review
 * @return {Promise<string>} - Returns a promise with a success message upon successfully liking a review
 */
async function likeReview(reviewID: string): Promise<string> {
  //Implemnentation goes here
}

/**
 * Function for disliking a review
 * @param {string} reviewID - The ID of the review
 * @return {Promise<string>} - Returns a promise with a success message upon successfully disliking a review
 */
async function dislikeReview(reviewID: string): Promise<string> {
  //Implemnentation goes here
}

/**
 * Function for replying to a review
 * @param {string} reviewID - The ID of the review
 * @param {string} userID - The ID of the user
 * @param {string} reply - The reply of the user
 * @return {Promise<string>} - Returns a promise with a success message upon successfully replying to a review
 */
async function replyReview(
  reviewID: string,
  userID: string,
  reply: string
): Promise<string> {
  //Implemnentation goes here
}

/**
 * Function for reporting a review
 * @param {string} reviewID - The ID of the review
 * @param {string} userID - The ID of the user
 * @param {string} report - The report of the user
 * @return {Promise<string>} - Returns a promise with a success message upon successfully reporting a review
 */
async function reportReview(
  reviewID: string,
  userID: string,
  report: string
): Promise<string> {
  //Implemnentation goes here
}

// Exporting functions
export {
  getAllReviews,
  createReview,
  likeReview,
  dislikeReview,
  replyReview,
  reportReview,
};
