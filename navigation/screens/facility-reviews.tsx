import React from "react";
import Review from "@/components/review";
import { View } from "@/components/Themed";
import { ScrollView, ImageBackground, StyleSheet } from "react-native";

const blobimage = { uri: "/assets/images/blob.png" };

export default function FacilityReviewsScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <ImageBackground
            source={blobimage}
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
          {Review()}
          {Review()}
          {Review()}
          {Review()}
          {Review()}
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
    backgroundColor: "#EEF8F7",
    width: "90%",
    marginVertical: 15,
  },
});
