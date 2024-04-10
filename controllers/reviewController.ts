/**
 * Function for retrieving reviews of a bathroom
 * @param {string} bathroomID - ID of bathroom
 * @returns {Promise<Review[]>} - Returns a promise with all reviews for specific bathroom after retrieving
 */
export async function getAllReviews(bathroomID: string): Promise<Review[]> {
  //Implementation goes here
  return new Promise<Review[]>((resolve) => {
    const bathroomReviews: Review[] = [
      {
        id: bathroomID,
        name: "Review 1",
      },
      {
        id: bathroomID,
        name: "Review 2",
      },
    ];

    setTimeout(() => {
      resolve(bathroomReviews);
    }, 1000);
  });
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
  rating: int,
  time: Date,
): Promise<string> {
  //Implementation goes here
  return new Promise<string>((resolve) => {
    const successsMsg = `${username} created a review successfully for ${bathroomID} at ${time}: ${description} with a overall rating of ${rating}.`;

    setTimeout(() => {
      resolve(successsMsg);
    }, 1000);
  });
}

/**
 * Function for liking a review
 * @param {string[]} reviewID - The ID of the review
 * @return {Promise<string>} - Returns a promise with a success message upon successfully liking a review
 */
export async function likeReview(reviewID: string[]): Promise<string> {
  //Implemnentation goes here
  return new Promise<string>((resolve) => {
    const successsMsg = `Review (${reviewID}) successfully liked.`;

    setTimeout(() => {
      resolve(successsMsg);
    }, 1000);
  });
}

/**
 * Function for disliking a review
 * @param {string[]} reviewID - The ID of the review
 * @return {Promise<string>} - Returns a promise with a success message upon successfully disliking a review
 */
export async function dislikeReview(reviewID: string[]): Promise<string> {
  //Implemnentation goes here
  return new Promise<string>((resolve) => {
    const successsMsg = `Review (${reviewID}) successfully disliked.`;

    setTimeout(() => {
      resolve(successsMsg);
    }, 1000);
  });
}

/**
 * Function for replying to a review
 * @param {string[]} reviewID - The ID of the review
 * @param {string} username - The user
 * @param {string} reply - The reply of the user
 * @return {Promise<string>} - Returns a promise with a success message upon successfully replying to a review
 */
export async function replyReview(
  reviewID: string[],
  username: string,
  reply: string,
): Promise<string> {
  //Implemnentation goes here
  return new Promise<string>((resolve) => {
    const successsMsg = `${username} replied to a review (${reviewID})successfully: ${reply}`;

    setTimeout(() => {
      resolve(successsMsg);
    }, 1000);
  });
}

/**
 * Function for reporting a review
 * @param {string} reviewID - The ID of the review
 * @param {string} username - The user
 * @param {string} report - The report of the user
 * @return {Promise<string>} - Returns a promise with a success message upon successfully reporting a review
 */
export async function reportReview(
  reviewID: string,
  username: string,
  report: string,
): Promise<string> {
  //Implemnentation goes here
  return new Promise<string>((resolve) => {
    const successsMsg = `${username} successfully reported a review (${reviewID}): ${report}`;

    setTimeout(() => {
      resolve(successsMsg);
    }, 1000);
  });
}
