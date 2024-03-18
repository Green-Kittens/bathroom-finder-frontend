import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
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
    height: windowHeight * 0.68,
    resizeMode: "cover",
    top: 0,
    position: "absolute",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#d6d6d6",
    padding: 1,
    borderRadius: 30,
    marginHorizontal: 30,
    height: 60,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
