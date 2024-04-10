import React, { useState }  from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  likeReview,
  dislikeReview,
  replyReview,
} from "@/controllers/reviewController";

export default function FacilityReviewsScreen(
  reviewID: string[],
  username: string
) {
  /**like a review */
  const [reply, setReply] = useState("");
  const handleLike = async () => {
    try {
      const likes = await likeReview(reviewID);
    } catch (error) {
      console.error("Error liking review:", error);
    }
  };
  /**dislike a review */
  const handleDislike = async () => {
    try {
      const dislikes = await dislikeReview(reviewID);
    } catch (error) {
      console.error("Error disliking review:", error);
    }
  };
  /**replay to a review */
  const handleReply = async () => {
    try {
      const replies = await replyReview(reviewID, username, reply);
    } catch (error) {
      console.error("Error replying to review:", error);
    }
  };
  return (
    <ScrollView>
      {exampleReview(handleLike, handleDislike, handleReply)}
      {exampleReview(handleLike, handleDislike, handleReply)}
      {exampleReview(handleLike, handleDislike, handleReply)}
      {exampleReview(handleLike, handleDislike, handleReply)}
    </ScrollView>
  );
}

function exampleReview(handleLike, handleDislike, handleReply) {
  return (
    <View id="review" style={{ padding: 5 }}>
      <View id="review-header" style={{ flexDirection: "row", width: "100%" }}>
        <View id="photo">
          <Image
            style={styles.photo}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Hausziege_04.jpg",
            }}
          />
        </View>
        <View id="stars-and-title" style={{ width: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "80%",
            }}
          >
            {star()}
            {star()}
            {star()}
            {star()}
            {star()}
          </View>
          <Text style={{ fontSize: 24 }}>Review Title</Text>
        </View>
      </View>
      <View id="review-body">
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis
          luctus metus. Morbi semper sollicitudin efficitur. Curabitur placerat
          ante maximus, posuere tortor vulputate, fermentum arcu. Sed sit amet
          mi vitae erat lacinia congue. Donec euismod eros quis leo venenatis,
          eu commodo leo ullamcorper. Maecenas in leo at dolor placerat
          tincidunt vitae ut ipsum. Curabitur maximus ut metus vel convallis.
          Aliquam ac molestie turpis. Mauris at leo pellentesque, aliquam purus
          ac, dapibus nibh.
        </Text>
      </View>
      <View id="review-actions" style={styles.buttonContainer}>
        <Button onPress={handleLike} title="Like" />
        <Button onPress={handleDislike} title="Dislike" />
        <Button onPress={handleReply} title="Reply" />
      </View>
    </View>
  );
}

function star() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={{
        uri: "https://t3.ftcdn.net/jpg/01/21/64/88/360_F_121648819_ZQ0tZ6tjLzxim1SG7CQ86raBw4sglCzB.jpg",
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "EudoxusSans-Bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  photo: {
    width: 100,
    height: 100,
  },
});
