import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getAllReviews, createReview } from "../reviewController";
import { port, host } from "../env";

describe("getAllReviews", () => {
  it("should return all reviews for a specified bathroom", async () => {
    const mock = new MockAdapter(axios);
    const reviews = [
      {
        id: "1",
        rating: 0,
        likes: 0,
        dislikes: "undefined",
        facilityId: "undefined",
        userId: "undefined",
        date: "2024-04-24",
        description: "undefined",
      },
    ];
    mock.onGet(`http://${host}:${port}/reviews/`).reply(200, reviews);

    const result = await getAllReviews();
    expect(result).toEqual(reviews);
  });

  it("should handle errors", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`http://${host}:${port}/reviews/`).reply(500);

    await expect(getAllReviews()).rejects.toThrow(
      "Request failed with status code 500",
    );
  });
});

describe("createReview", () => {
  it("should return a success message upon successfully creating a review", async () => {
    const mock = new MockAdapter(axios);
    const review = {
      id: undefined,
      rating: null,
      likes: null,
      dislikes: null,
      facilityId: undefined,
      userId: undefined,
      date: undefined,
      description: undefined,
    };
    const success = `Review for bathroom (${review.facilityId}) successfully created by ${review.userId}: ${review.description}`;
    mock.onPost(`http://${host}:${port}/reviews/`).reply(200, success);

    const result = await createReview();
    expect(result).toEqual(success);
  });

  it("should handle errors", async () => {
    const mock = new MockAdapter(axios);
    mock.onPost(`http://${host}:${port}/reviews/`).reply(500);

    await expect(createReview()).rejects.toThrow(
      "Request failed with status code 500",
    );
  });
});
