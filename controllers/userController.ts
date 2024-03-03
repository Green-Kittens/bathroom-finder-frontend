/**
 * Function to register a new user
 * @param {string} firstname - The first name of the user
 * @param {string} lastname - The last name of the user
 * @param {string} username - The username of the user *encrypted
 * @param {string} email - The email address of the user
 * @param {string} password - The password of the user *encrypted
 * @param {Image} profile = Optional profile display image
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
 * @param {string} email = The email of the user
 */
async function forgotPassword(email: string): Promise<string> {
  //Implementation goes here
}

// Exporting functions
export { registerUser, loginUser };
