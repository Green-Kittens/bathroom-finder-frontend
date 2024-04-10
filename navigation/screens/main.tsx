import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../type";

/* eslint-disable */
const map = require("../../assets/images/map.jpg");

export default function MainScreen() {
  // navigation
  const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("FacilityProfile");
        }}
      >
        <Image source={map} style={styles.image} />
      </TouchableWithoutFeedback>
    </View>
  );
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: windowHeight,
    resizeMode: "cover",
    top: 0,
    position: "absolute",
    marginBottom: 20,
  },
});
