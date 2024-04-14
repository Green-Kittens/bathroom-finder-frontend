export type Review = {
  id: string;
  rating: number;
  likes: number;
  dislikes: number;
  pictureURL?: string;
  facilityId: string;
  userId: string;
  date: string;
  description: string;
};
