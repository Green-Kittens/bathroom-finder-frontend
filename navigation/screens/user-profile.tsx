import React from "react";
import { Image, ScrollView, StyleSheet, Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

// types
import { ScreenNavigationProp } from "../type";

// navigation
// const navigation = useNavigation<ScreenNavigationProp>();

export default function UserProfileScreen() {
  return (
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
      <View>
        <View style={{ marginHorizontal: "40%", marginVertical: 5 }}>
          <Button
            title="Log Out"
            onPress={() => {
                // go to login page
            }} 
            />
        </View>
      </View>
    </ScrollView>
  );
}

function horizontalCards(title: string) {
  return (
    <View>
      <Text style={{ margin: 10 }}>{title}</Text>
      <ScrollView horizontal={true} style={styles.horizontalScroll}>
        {card()}
        {card()}
        {card()}
        {card()}
        {card()}
        {card()}
        {card()}
        {card()}
      </ScrollView>
    </View>
  );
}

function card() {
  return <View style={styles.card} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 5,
  },
  profilePictureContainer: {
    alignItems: "center",
  },
  horizontalScroll: {},
  card: {
    width: 80,
    height: 120,
    borderRadius: 10,
    backgroundColor: "grey",
    marginHorizontal: 5,
  },
});
