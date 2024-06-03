import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { getUserProfile } from "../controllers/userController";
import { User } from "../types/user";
import { Review as ReviewType } from "../types/review";

interface ReviewProps {
  review: ReviewType;
}

const Review: React.FC<ReviewProps> = ({ review }) => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    console.log("Review prop:", review);
    (async () => {
      const data = await getUserProfile(review.UserId);
      setUserData(data);
    })();
  }, [review.UserId]);

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.review}>
      <View style={[styles.toprow, { flexWrap: "wrap", alignItems: "center" }]}>
        <Image
          style={{ height: 60, width: 60, borderRadius: 50 }}
          source={{
            uri: userData.PictureURL,
          }}
        />
        <Text style={[styles.paragraph, { fontFamily: "EudoxusSans-Bold" }]}>
          {userData.DisplayName}
        </Text>
        <View style={[styles.toprow]}>
          <StarRatingDisplay rating={review.Rating} color="black" />
        </View>
      </View>

      <View
        id="review-body"
        style={{
          backgroundColor: "#CDEEEA",
          marginVertical: 15,
          width: "100%",
        }}
      >
        <Text style={[{ padding: 10 }]}>{review.Description}</Text>
      </View>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "none",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "none",
    width: "80%",
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  paragraph: {
    margin: 24,
    fontSize: 14,
  },
  button: {
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 4,
    fontWeight: "bold",
    paddingHorizontal: 60,
    paddingVertical: 10,
  },
  row: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "none",
  },
  review: {
    flex: 1,
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "none",
  },
  toprow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "none",
  },
});
