import React from "react";
import { Image, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";

export function notReview() {
  return (
    <View style={styles.review}>
      <View style={[styles.toprow, { flexWrap: "wrap", alignItems: "center" }]}>
        <Image
          style={{ height: 60, width: 60, borderRadius: 50 }}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Hausziege_04.jpg",
          }}
        />
        <Text style={[styles.paragraph, { fontFamily: "EudoxusSans-Bold" }]}>
          Username
        </Text>
        <View style={[styles.toprow]}>
          {star()}
          {star()}
          {star()}
          {star()}
          {star()}
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
        <Text
          style={{ fontSize: 24, marginVertical: 10, marginHorizontal: 10 }}
        >
          Review Title
        </Text>
        <Text style={[{ padding: 10 }]}>
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
    </View>
  );
}

export default function Review() {
  return notReview();
}

function star() {
  return (
    <Image
      style={{ width: 30, height: 30 }}
      source={require("../assets/images/star_filled.png")}
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
