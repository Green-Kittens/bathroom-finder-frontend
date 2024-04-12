import React from "react";
import horizontalCards from "../../components/HorizontalCards";
import MainButton from "../../components/Buttons";
import {
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// types
import { ScreenNavigationProp } from "../type";

const boomerangimage = { uri: "/assets/images/boomerang.png" };

export default function UserProfileScreen() {
  // navigation
  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={boomerangimage}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        imageStyle={{
          resizeMode: "cover",
          alignSelf: "flex-end",
        }}
      ></ImageBackground>
      <ScrollView>
        <View style={styles.profilePictureContainer}>
          <Image
            style={styles.profilePicture}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Hausziege_04.jpg",
            }}
          />
          <Text>Your Name</Text>
        </View>
        {horizontalCards("Your Reviews")}
        {horizontalCards("Your Favorites")}
        <View style={[{ backgroundColor: "none" }]}>
          <View
            style={{
              marginHorizontal: "50%",
              marginVertical: 20,
              backgroundColor: "none",
              minWidth: 200,
            }}
          >
            {MainButton("Log Out", () => {
              navigation.navigate("Login");
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#EEF8F7",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "none",
    fontFamily: "EudoxusSans-Bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 5,
  },
  profilePictureContainer: {
    alignItems: "center",
    backgroundColor: "none",
  },
});
