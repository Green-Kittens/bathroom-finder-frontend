/**
 * Function for retrieving a specific bathroom
 * @returns {Promise<string>} - Returns a promise with a success message after retrieving all bathrooms
 */
async function getAllBathrooms(): Promise<string> {
  //Implementation goes here
}

/**
 * Function for retrieving a specific bathroom
 * @param {string} bathroomID - The ID of the bathroom
 * @returns {Promise<BathroomProfile>} - Returns a promise with bathroom profile information
 */
async function getBathroomProfile(
  bathroomID: string
): Promise<BathroomProfile> {
  //Implementation goes here
}

/**
 * Function for filtering bathrooms to look for specific type of bathrooms
 * @param {int} location - *Optional location of user
 * @param {string} tags - The tags used to filter bathroom types
 * @returns {Promise<string>} - Returns a promise with a success message after retrieving all bathrooms of certain type(s)
 */
async function getSomeBathrooms(
  location: Int16Array,
  tags: string
): Promise<string> {
  //Implementation goes here
}

/**
 * Function for reporting a bathroom
 * @param {string} bathroomID - The ID of the bathroom
 * @param {string} userID - The ID of the user
 * @param {string} report - The report of the user
 * @return {Promise<string>} - Returns a promise with a success message upon successfully reporting a bathroom
 */
async function reportBathroom(
  reviewID: string,
  userID: string,
  report: string
): Promise<string> {
  //Implemnentation goes here
}

/**
 * Function for favoriting a bathroom
 * @param {string} bathroomID - The ID of the bathroom
 * @param {string} userID - The ID of the user
 * @return {Promise<string>} - Returns a promise with a success message upon successfully favoriting a bathroom
 */
async function favoriteBathroom(
  bathroomID: string,
  userID: string
): Promise<string> {
  //Implemnentation goes here
}

// Exporting functions
export {
  getAllBathrooms,
  getBathroomProfile,
  getSomeBathrooms,
  reportBathroom,
  favoriteBathroom,
};
