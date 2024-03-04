import React from "react";
import MainButton from "./main_button";
import { Image, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

export default function Review() {
  return (
    <View id="review" style={{ padding: 5, backgroundColor: "none" }}>
      <View
        id="review-header"
        style={{ flexDirection: "row", width: "100%", backgroundColor: "none" }}
      >
        <View id="photo">
          <Image
            style={styles.photo}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Hausziege_04.jpg",
            }}
          />
        </View>
        <View
          id="stars-and-title"
          style={{ width: "100%", backgroundColor: "none" }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "80%",
              backgroundColor: "none",
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
      <View
        id="review-body"
        style={{ backgroundColor: "none", marginVertical: 15 }}
      >
        <Text style={[{ backgroundColor: "none" }]}>
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
        {MainButton("Like", null)}
        {MainButton("Dislike", null)}
        {MainButton("Reply", null)}
      </View>
    </View>
  );
}

function star() {
  return (
    <Image
      style={{ width: 50, height: 50, backgroundColor: "none" }}
      source={require("@/assets/images/star_filled.png")}
    />
  );
}

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
    width: "100%",
    justifyContent: "space-evenly",
    backgroundColor: "none",
  },
  photo: {
    width: 100,
    height: 100,
  },
  button: {
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 4,
    fontWeight: "bold",
    paddingHorizontal: 60,
    paddingVertical: 10,
  },
});
