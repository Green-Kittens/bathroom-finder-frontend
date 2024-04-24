import React from "react";
import MainButton, { CancelButton } from "../../components/Buttons";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Modal,
} from "react-native";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import StarRating from "react-native-star-rating-widget";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useImages } from "../../contexts/ImageContext";
import { HorizontalCards } from "../../components/Carousel";
import { ScreenNavigationProp } from "../type";

export default function ReviewForm() {
  // location
  const [, setLocation] = useState("");

  // getting current date and time
  const currentDate = new Date();

  // description
  const [description, setDescription] = useState("");

  // image uploader and carousel
  const { addImage } = useImages("reviewForm");
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddImage = async (source: "camera" | "gallery") => {
    let pickerResult;
    if (source === "camera") {
      const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraPerm.granted) {
        pickerResult = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }
    } else {
      const galleryPerm =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (galleryPerm.granted) {
        pickerResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }
    }

    if (pickerResult && !pickerResult.canceled) {
      addImage(pickerResult);
      setModalVisible(false); // Hide modal after adding image
    }
  };

  // rating
  const [rating, setRating] = useState(0);

  // post rating (submit button)
  const navigation = useNavigation<ScreenNavigationProp>();
  const circleimage = { uri: "/assets/images/circle.png" };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={circleimage}
        style={{
          width: 1070,
          height: 1000,
          position: "absolute",
          top: 550,
          left: -200,
        }}
        imageStyle={{
          resizeMode: "cover",
          alignSelf: "flex-end",
        }}
      ></ImageBackground>
      <ScrollView style={{ width: "100%" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
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
          </View>

          <Text style={styles.subtext}>{currentDate.toLocaleString()}</Text>

          <HorizontalCards componentId="reviewForm" />

          <TextInput
            style={styles.input}
            placeholder="write your description..."
            placeholderTextColor="#344f33"
            value={description}
            onChangeText={setDescription}
            multiline={true}
          />

          {MainButton("Add Photo", () => setModalVisible(true))}
          {modalVisible && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {MainButton("Take Photo", () => handleAddImage("camera"))}
                  {MainButton("Choose from Gallery", () =>
                    handleAddImage("gallery"),
                  )}
                  {CancelButton("Close", () => setModalVisible(false))}
                </View>
              </View>
            </Modal>
          )}

          <Text style={[styles.subtext, { color: "black" }]}>
            Rate Your Experience:
          </Text>
          <StarRating
            style={styles.starRating}
            rating={rating}
            onChange={setRating}
            enableHalfStar={false}
            color="black"
          />

          {MainButton("Post Rating", () => {
            // make a check to make sure that all fields are filled out
            navigation.navigate("Main");
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF8F7",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  dropdown: {
    flexDirection: "row",
    color: "white",
    fontSize: 17,
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CDEEEA",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 200,
  },
  icon: {
    marginLeft: "auto",
  },
  subtext: {
    fontSize: 17,
    marginBottom: 20,
    color: "#6da798",
  },
  errorText: {
    fontSize: 17,
    marginBottom: 20,
    color: "#540F00",
  },
  input: {
    backgroundColor: "#CDEEEA",
    borderRadius: 20,
    padding: 10,
    width: "85%",
    minHeight: 150,
    marginBottom: 20,
  },
  starRating: {
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageLink: {
    marginRight: 10,
    color: "blue",
  },
  card: {
    width: 100,
    height: 150,
    borderRadius: 10,
    backgroundColor: "grey",
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: 100,
    height: 150,
    borderRadius: 10, // If you want rounded corners for the images
  },
  horizontalScroll: {
    marginVertical: 10,
  },
});
