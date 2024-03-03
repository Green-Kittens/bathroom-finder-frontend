/**
 * Function to register a new user
 * @param {string} firstname - The first name of the user
 * @param {string} lastname - The last name of the user
 * @param {string} username - The username of the user *encrypted
 * @param {string} email - The email address of the user
 * @param {string} password - The password of the user *encrypted
 * @param {Image} profile - Optional profile display image
 * @returns {Promise<string>} - Returns a promise with a success message upon successful registration
 */
async function registerUser(
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string,
  profile: typeof Image
): Promise<string> {
  // Implementation goes here
  //must create ID for user
}

/**
 * Function to log in a user
 * @param {string} user - The username or email of the user
 * @param {string} password - The password of the user
 * @returns {Promise<string>} - Returns a promise with a success message upon successful login
 */
async function loginUser(user: string, password: string): Promise<string> {
  // Implementation goes here
}

/**
 * Function for forgot password
 * @param {string} email - The email of the user
 * @returns {Promise<string>} - Returns a promise with a success message upon successfully emailing reset password link
 */
async function forgotPassword(email: string): Promise<string> {
  //Implementation goes here
}

/**
 * Function for retrieving user profile information
 * @param {string} userID - The ID of the user
 * @returns {Promise<UserProfile>} - Returns a promise with user profile information
 */
async function getUserProfile(email: string): Promise<UserProfile> {
  //Implementation goes here
}

/**
 * Function for creating a bathroom
 * @param {string} userID - The ID of the user
 * @param {string} opHours - The hours of operation of the bathroom (days and times)
 * @param {string} description - *Optional description of the bathroom
 * @param {string[]} tags - List of tags to filter the bathroom by
 * @param {Image} images - *Optional images of the bathroom
 * @returns {Promise<string>} - Returns a promise with a success message upon successfully creating a new bathroom
 */
async function createBathroom(
  userID: string,
  opHours: string,
  description: string,
  tags: string[],
  images: typeof Image
): Promise<string> {
  //Implementation goes here
}

/**
 * Function for retrieving user's favorite bathrooms
 * @param {string} userID - The ID of the user
 * @returns {Promise<string>} - Returns a promise with a success message after retrieving all favorite bathrooms
 */
async function getFavorites(userID: string): Promise<string> {
  //Implementation goes here
}

/**
 * Function for retrieving user's reviews
 * @param {string} userID - The ID of the user
 * @returns {Promise<string>} - Returns a promise with a success message after retrieving all reviews user has left
 */
async function getUserReviews(userID: string): Promise<string> {
  //Implementation goes here
}

// Exporting functions
export {
  registerUser,
  loginUser,
  forgotPassword,
  getUserProfile,
  createBathroom,
  getFavorites,
  getUserReviews,
};
