import React from "react";
import { Button, StyleSheet, TextInput, Text, View } from "react-native";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { MaterialIcons } from "@expo/vector-icons";
import StarRating from "react-native-star-rating-widget";
import { createReview } from "@/controllers/reviewController";

// screens
import Main from "./home";
import { useNavigation } from "@react-navigation/native";

export default function TabReviewForm(
  username: string,
  bathroomID: string,
  time: Date,
) {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const handleReview = async () => {
    try {
      const review = await createReview(
        username,
        bathroomID,
        description,
        rating,
        time
      );
    } catch (error) {
      console.error("Error creating new review:", error);
    }
  };

  // location
  const [, setLocation] = useState("");

  // getting current date and time
  const currentDate = new Date();

  // post rating (submit button)
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Bathroom Rating</Text>

      <View style={styles.dropdown}>
        <RNPickerSelect
          placeholder={{
            label: "select a location",
            value: null,
          }}
          onValueChange={(newLocation) => setLocation(newLocation)}
          items={[
            { label: "Location 1", value: "location1" },
            { label: "Location 2", value: "location2" },
          ]}
        />
        <MaterialIcons
          style={styles.icon}
          name="keyboard-arrow-down"
          size={17}
          color="white"
        />
      </View>

      <Text style={styles.subtext}>{currentDate.toLocaleString()}</Text>

      <TextInput
        style={styles.input}
        placeholder="write your description..."
        placeholderTextColor="#344f33"
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />

      <Text style={styles.subtext}>Rate Your Experience:</Text>
      <StarRating
        style={styles.starRating}
        rating={rating}
        onChange={setRating}
        enableHalfStar={false}
      />

      <View style={styles.button}>
        <Button
          title="Post Rating"
          color="RGA0000"
          onPress={
            handleReview
            // handle submit
            //navigation.navigate('/');
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#afd6ae",
    color: "#344f33",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#344f33",
  },
  dropdown: {
    flexDirection: "row",
    color: "white",
    fontSize: 17,
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#344f33",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  icon: {
    marginLeft: "auto",
  },
  subtext: {
    fontSize: 17,
    marginBottom: 20,
    color: "#344f33",
  },
  input: {
    borderWidth: 1,
    borderColor: "#344f33",
    borderRadius: 20,
    padding: 10,
    width: "85%",
    minHeight: 150,
    marginBottom: 20,
    color: "#344f33",
  },
  button: {
    fontSize: 17,
    backgroundColor: "#344f33",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  starRating: {
    marginBottom: 20,
  },
});
