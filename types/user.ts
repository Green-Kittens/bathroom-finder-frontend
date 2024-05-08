export type User = {
  id: string;
  email: string;
  password: string;
  favorites: string[];
  reviews: string[];
  dateJoined: Date;
  pfpURL?: string;
  displayName: string;
};
