export type Review = {
  ReviewID: string;
  Rating: number;
  Likes: number;
  Dislikes: number;
  PictureURL: string[];
  FacilityID: string;
  UserID: string;
  Date: Date;
  Description: string;
};
