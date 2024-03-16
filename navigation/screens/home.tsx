import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import {
  getAllBathrooms,
  getBathroomProfile,
} from "@/controllers/bathroomController";
import { getUserProfile } from "@/controllers/userController";

/* eslint-disable */
const map = require("../../assets/images/map.jpg");

export default function MainScreen(bathroomID: string, username: string) {
  /*gets bathroom profile information*/
  const handleBathroomProfile = async () => {
    try {
      const bathroomProfile = await getBathroomProfile(bathroomID);
    } catch (error) {
      console.error("Error retrieving bathroom profile:", error);
    }
  };

  /**gets user profile information*/
  const handleUserProfile = async () => {
    useEffect(() => {
      async function fetchUser() {
        try {
          /**use api to fetch actual username and setUsername before calling controller func */
          const userProfile = await getUserProfile(username);
        } catch (error) {
          console.error("Error retrieving user profile:", error);
        }
      }
    });
  };

  /**gets all bathrooms to filter through */
  const handleSearch = async () => {
    try {
      const bathrooms = await getAllBathrooms();
    } catch (error) {
      console.error("Error retrieving all bathrooms:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={map} style={styles.image} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <FontAwesome
            name="user"
            size={50}
            color="black"
            onPress={handleUserProfile}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <FontAwesome name="plus" size={50} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <FontAwesome
            name="search"
            size={40}
            color="black"
            onPress={handleSearch}
          />
        </TouchableOpacity>
      </View>
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
