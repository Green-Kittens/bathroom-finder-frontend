import React from "react";
import Review from "../../components/Review";
import { View } from "../../components/Themed";
import { ScrollView, ImageBackground, StyleSheet } from "react-native";

const blobimage = { uri: "/assets/images/blob.png" };

export default function FacilityReviewsScreen() {
  return (
    <ScrollView style={{ width: "100%", height: 100 }}>
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
          <View style={styles.subcontainer}>{Review()}</View>
          <View style={styles.subcontainer}>{Review()}</View>
          <View style={styles.subcontainer}>{Review()}</View>
          <View style={styles.subcontainer}>{Review()}</View>
          <View style={styles.subcontainer}>{Review()}</View>
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
    width: "90%",
    marginVertical: 15,
  },
  reviewContainer: {
    marginVertical: 40,
  },
});
