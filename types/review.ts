export type Review = {
  ReviewID: string;
  Rating: number;
  Likes: number;
  Dislikes: number;
  PictureURL: string[];
  FacilityId: string;
  UserId: string;
  Date: Date;
  Description: string;
};
