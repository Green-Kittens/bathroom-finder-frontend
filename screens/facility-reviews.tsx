import React from "react";
import { View } from "../components/Themed";
import { ScrollView, ImageBackground, StyleSheet } from "react-native";
import { Review as BathroomReview } from "../types/review";
import Review from "../components/Review";
import { useRoute, RouteProp } from "@react-navigation/native";

type FacilityReviewsRouteParams = { reviews: BathroomReview[] };
type FacilityReviewsRouteProp = RouteProp<
  { FacilityReviews: FacilityReviewsRouteParams },
  "FacilityReviews"
>;

export default function FacilityReviewsScreen() {
  const route = useRoute<FacilityReviewsRouteProp>();
  const { reviews } = route.params;

  return (
    <ScrollView style={{ width: "100%", height: 100 }}>
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <ImageBackground
            source={require("../assets/images/blob.png")}
            style={{
              width: 953,
              height: 1069,
              position: "absolute",
              top: 0,
              left: -200,
            }}
            imageStyle={{
              resizeMode: "cover",
              alignSelf: "flex-end",
            }}
          ></ImageBackground>
          <View
            style={{ justifyContent: "space-evenly", backgroundColor: "none" }}
          >
            {reviews.map((review) => {
              console.log("review!!!");
              console.log(review);
              return <Review key={review._id} review={review} />;
})}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF8F7",
  },
  subcontainer: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "none",
    width: "100%",
    paddingHorizontal: 10,
  },
});
