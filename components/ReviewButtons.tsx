import React from "react";
import { Image, StyleSheet } from "react-native";
import MainButton from "./Buttons";
import Review from "./Review";
import { Text, View } from "../components/Themed";

export default function ReviewButtons() {
  return (
    <View style={[{ backgroundColor: "none", justifyContent: "center" }]}>
      <View style={styles.subcontainer}>{Review()}</View>
      <View
        style={[
          {
            flexDirection: "row",
            backgroundColor: "none",
            justifyContent: "center",
          },
        ]}
      >
        <View
          id="review-actions"
          style={[
            {
              flexDirection: "row",
              width: "75%",
              justifyContent: "center",
              backgroundColor: "none",
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
    justifyContent: "center",
    backgroundColor: "none",
    width: "100%",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
});
