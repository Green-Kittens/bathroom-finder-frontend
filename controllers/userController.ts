/**
 * Function to register a new user
 * @param {string} firstname - The first name of the user
 * @param {string} lastname - The last name of the user
 * @param {string} username - The username of the user
 * @param {string} email - The email address of the user
 * @param {string} password - The password of the user *encrypted
 * @param {Optional<Image>} profile - Profile display image
 * @returns {Promise<string>} - Returns a promise with a success message upon successful registration
 */
export async function registerUser(
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string,
  profile: typeof Image,
): Promise<string> {
  // Implementation goes here
  //must create ID for user
  return new Promise<string>((resolve) => {
    const successsMsg = `${username} (${firstname},${lastname}) successfully created with email (${email}), password (${password}), and profile ${profile}.`;

    setTimeout(() => {
      resolve(successsMsg);
    }, 1000);
  });
}

/**
 * Function to log in a user
 * @param {string} user - The username or email of the user
 * @param {string} password - The password of the user
 * @returns {Promise<string>} - Returns a promise with a success message upon successful login
 */
export async function loginUser(
  user: string,
  password: string,
): Promise<string> {
  // Implementation goes here
  return new Promise<string>((resolve) => {
    const successsMsg = `${user} successfully logged in: ${password}`;

    setTimeout(() => {
      resolve(successsMsg);
    }, 1000);
  });
}

/**
 * Function for forgot password
 * @param {string} email - The email of the user
 * @returns {Promise<string>} - Returns a promise with a success message upon successfully emailing reset password link
 */
export async function forgotPassword(email: string): Promise<string> {
  //Implementation goes here
  return new Promise<string>((resolve) => {
    const successsMsg = `Forgot password link successfully sent to user's email (${email}).`;

    setTimeout(() => {
      resolve(successsMsg);
    }, 1000);
  });
}

/**
 * Function for retrieving user profile information
 * @param {string} username - The user
 * @returns {Promise<UserProfile>} - Returns a promise with user profile information
 */
export async function getUserProfile(username: string): Promise<UserProfile> {
  //Implementation goes here
  return new Promise<UserProfile>((resolve) => {
    const userProfile: UserProfile = {
      user: username,
      name: "Placeholder User",
    };
    setTimeout(() => {
      resolve(userProfile);
    }, 1000);
  });
}

/**
 * Function for creating a bathroom
 * @param {string} username - The user
 * @param {string} opHours - The hours of operation of the bathroom (days and times)
 * @param {Optional<string>} description - Description of the bathroom
 * @param {string[]} tags - List of tags to filter the bathroom by
 * @param {Optional<Image>} images - Uploaded images of the bathroom
 * @returns {Promise<string>} - Returns a promise with a success message upon successfully creating a new bathroom
 */
export async function createBathroom(
  username: string,
  opHours: string,
  description: string,
  tags: string[],
  images: typeof Image,
): Promise<string> {
  //Implementation goes here
  return new Promise<string>((resolve) => {
    const successsMsg = `Bathroom successfully created by ${username}: hours of operation (${opHours}), description (${description}), tags (${tags}), images (${images})`;

    setTimeout(() => {
      resolve(successsMsg);
    }, 1000);
  });
}

/**
 * Function for retrieving user's favorite bathrooms
 * @param {string}  username - The user
 * @returns {Promise<BathroomProfile[]>} - Returns a promise with all favorite bathrooms after retrieving
 */
export async function getFavorites(
  username: string,
): Promise<BathroomProfile[]> {
  //Implementation goes here
  return new Promise<BathroomProfile[]>((resolve) => {
    const favoritedBathrooms: BathroomProfile[] = [
      {
        id: "1",
        user: username,
        name: "Bathroom 1",
      },
      {
        id: "2",
        user: username,
        name: "Bathroom 2",
      },
    ];

    setTimeout(() => {
      resolve(favoritedBathrooms);
    }, 1000);
  });
}

/**
 * Function for retrieving user's reviews
 * @param {string} username - The user
 * @returns {Promise<Review[]>} - Returns a promise with all reviews user has left after retrieving
 */
export async function getUserReviews(username: string): Promise<Review[]> {
  //Implementation goes here
  return new Promise<Review[]>((resolve) => {
    const bathroomReviews: Review[] = [
      {
        id: "1",
        user: username,
        name: "Review 1",
      },
      {
        id: "2",
        user: username,
        name: "Review 2",
      },
    ];

    setTimeout(() => {
      resolve(bathroomReviews);
    }, 1000);
  });
}
