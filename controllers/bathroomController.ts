/**
 * Function for retrieving all bathrooms
 * @returns {Promise<BathroomProfile[]>} - Returns a promise with all bathrooms after retrieving
 */
export async function getAllBathrooms(): Promise<BathroomProfile[]> {
  //Implementation goes here
  return new Promise<BathroomProfile[]>((resolve) => {
    const allBathrooms: BathroomProfile[] = [
      {
        id: "1",
        name: "Bathroom 1",
      },
      {
        id: "2",
        name: "Bathroom 2",
      },
    ];

    setTimeout(() => {
      resolve(allBathrooms);
    }, 1000);
  });
}

/**
 * Function for retrieving a specific bathroom
 * @param {string} bathroomID - The ID of the bathroom
 * @returns {Promise<BathroomProfile>} - Returns a promise with bathroom profile information
 */
export async function getBathroomProfile(
  bathroomID: string
): Promise<BathroomProfile> {
  //Implementation goes here
  return new Promise<BathroomProfile>((resolve) => {
    const bathroomProfile: BathroomProfile = {
      id: bathroomID,
      name: "Placeholder Bathroom",
    };
    setTimeout(() => {
      resolve(bathroomProfile);
    }, 1000);
  });
}

/**
 * Function for filtering bathrooms to look for specific type of bathrooms
 * @param {Optional<int>} location - Location of user
 * @param {List<string>} tags - The tags used to filter bathroom types
 * @returns {Promise<List<BathroomProfile>>} - Returns a promise with all bathrooms of certain type(s) after retrieving
 */
export async function getSomeBathrooms(
  location: Int16Array,
  tags: string
): Promise<BathroomProfile[]> {
  //Implementation goes here
  return new Promise<BathroomProfile[]>((resolve) => {
    const filteredBathrooms: BathroomProfile[] = [
      {
        id: "1",
        name: "Bathroom 1",
      },
      {
        id: "2",
        name: "Bathroom 2",
      },
    ];

    setTimeout(() => {
      resolve(filteredBathrooms);
    }, 1000);
  });
}

/**
 * Function for reporting a bathroom
 * @param {string} bathroomID - The ID of the bathroom
 * @param {string} username - The user
 * @param {string} report - The report of the user
 * @return {Promise<string>} - Returns a promise with a success message upon successfully reporting a bathroom
 */
export async function reportBathroom(
  reviewID: string,
  username: string,
  report: string
): Promise<string> {
  //Implemnentation goes here
  return new Promise<string>((resolve) => {
    const successsMsg = "Bathroom successfully reported.";

    setTimeout(() => {
      resolve(successsMsg);
    }, 1000);
  });
}

/**
 * Function for favoriting a bathroom
 * @param {string} bathroomID - The ID of the bathroom
 * @param {string} username - The user
 * @return {Promise<string>} - Returns a promise with a success message upon successfully favoriting a bathroom
 */
export async function favoriteBathroom(
  bathroomID: string,
  username: string
): Promise<string> {
  //Implemnentation goes here
  return new Promise<string>((resolve) => {
    const successsMsg = "Bathroom successfully favorited.";

    setTimeout(() => {
      resolve(successsMsg);
    }, 1000);
  });
}
