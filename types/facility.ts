export type Facility = {
  name: string;
  location: {
    coordinates: number[];
    type: string;
  };
  category: string;
  tags: string[];
  operations: string;
  date: string;
  pictureURL?: string;
  ratingAVG: number;
  favorites: number;
  reports: number;
};
