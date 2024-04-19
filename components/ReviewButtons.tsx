import React from "react";
import { StyleSheet } from "react-native";
import MainButton from "./Buttons";
import Review from "./Review";
import { View } from "../components/Themed";

export default function ReviewButtons() {
  return (
    <View style={styles.subcontainer}>
      {Review()}
      <View style={{ justifyContent: "center", backgroundColor: "none" }}>
        <View
          id="review-actions"
          style={[
            {
              flexDirection: "row",
              backgroundColor: "none",
              justifyContent: "space-around",
              padding: 10,
            },
          ]}
        >
          {MainButton("Like", undefined)}
          {MainButton("Dislike", undefined)}
          {MainButton("Reply", undefined)}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subcontainer: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "none",
    width: "100%",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
});
