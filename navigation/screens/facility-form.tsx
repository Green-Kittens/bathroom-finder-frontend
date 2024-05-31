//facility-form.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ImageCarousel } from "../../components/Carousel";
import { useImages } from "../../contexts/ImageContext"; // Ensure the import path is correct
import { ScreenNavigationProp } from "../type";
import MainButton, {
  CancelButton,
  SecondaryButton,
} from "../../components/Buttons";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

const btnInactive = "#6da798";
const btnActive = "#044962";

export default function FacilityForm() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [mapModal, setMapModal] = useState(false);
  const [markerAddress, setMarkerAddress] = useState("");
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject | null>(null);
  const [openTime, setOpenTime] = useState("");
  const [closedTime, setClosedTime] = useState("");
  const [isOpenPickerVisible, setOpenPickerVisibility] = useState(false);
  const [isClosedPickerVisible, setClosedPickerVisibility] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { addImage } = useImages("facilityForm");
  const { deleteImage } = useImages("facilityForm");
  const { images } = useImages("facilityForm");
  const [description, setDescription] = useState("");

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // for when hours = 0
    return `${hours}:${minutes} ${ampm}`;
  };

  const [tags, setTags] = useState({
    wheelchairAccessible: false,
    babyChanging: false,
    cleanedRegularly: false,
    genderNeutral: false,
  });

  const handleOpenConfirm = (date: Date) => {
    setOpenTime(formatTime(date));
    setOpenPickerVisibility(false);
  };

  const handleClosedConfirm = (date: Date) => {
    setClosedTime(formatTime(date));
    setClosedPickerVisibility(false);
  };

  const handleTagChange = (tag) => {
    setTags((prevTags) => ({
      ...prevTags,
      [tag]: !prevTags[tag],
    }));
  };

  const Tag = (tag, tagname, text: string) => {
    return (
      <View style={tag ? styles.tagCheckboxSelected : styles.tagCheckbox}>
        <TouchableOpacity onPress={() => handleTagChange(tagname)}>
          <Text
            style={{
              color: tag ? btnActive : btnInactive,
            }}
          >
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

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

  const initialOpenTime = "Open Time";
  const initialCloseTime = "Close Time";
  const scrollViewRef = useRef<ScrollView>();

  const resetTags = () => {
    if (tags.babyChanging) {
      handleTagChange("babyChanging");
    }
    if (tags.wheelchairAccessible) {
      handleTagChange("wheelchairAccessible");
    }
    if (tags.cleanedRegularly) {
      handleTagChange("cleanedRegularly");
    }
    if (tags.genderNeutral) {
      handleTagChange("genderNeutral");
    }
  };

  const resetForm = () => {
    setOpenTime(initialOpenTime);
    setClosedTime(initialCloseTime);
    setDescription("");
    for (let i = 0; i < images.length; i++) {
      deleteImage(images[i].assets[0].uri);
    }
    resetTags();
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false });
  };

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync();
        setCurrentLocation(location);
      }
    };
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/boomerang.png")}
        style={{
          width: 1000,
          height: 500,
          position: "absolute",
          top: -80,
          left: 100,
        }}
        imageStyle={{
          resizeMode: "cover",
          alignSelf: "flex-end",
        }}
      ></ImageBackground>
      <ScrollView
        ref={scrollViewRef /*ignore error here*/}
        style={{ width: "100%" }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            paddingTop: 60,
            marginTop: 80,
            paddingBottom: 250,
          }}
        >
          <Text style={styles.title}>Add a New Facility</Text>
          {currentLocation ? (
            <MapView
              style={styles.mapContainer}
              showsUserLocation={true}
              initialRegion={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.005, // adjusts zoom level (smaller the value, the more zoom)
                longitudeDelta: 0.005, // adjusts zoom level (smaller the value, the more zoom)
              }}
            >
              <Marker
                draggable // enables user to drag to desired location
                tappable // enables user to tap the marker and trigger modal
                coordinate={{
                  latitude: currentLocation.coords.latitude + 0.000001,
                  longitude: currentLocation.coords.longitude + 0.000001,
                }}
                onPress={async (e) => {
                  const { latitude, longitude } = e.nativeEvent.coordinate;
                  try {
                    const response = await axios.get(
                      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
                    );
                    const addressDetails = response.data.address;
                    let buildingName = "";
                    if (addressDetails && addressDetails.building) {
                      buildingName = addressDetails.building;
                    }
                    setMarkerAddress(
                      buildingName || response.data.display_name,
                    );
                    setMapModal(true);
                  } catch (error) {
                    console.error("Error fetching address:", error);
                  }
                }}
              ></Marker>
            </MapView>
          ) : (
            <Text style={styles.subtext}>Fetching current location...</Text>
          )}
          <Text>Press and drag pin marker to see address and relocate</Text>

          <Modal
            animationType="fade"
            transparent={true}
            visible={mapModal}
            onRequestClose={() => setMapModal(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.markerModalTitle}>Marker Location</Text>
                <Text>{markerAddress}</Text>
                {CancelButton("Close", () => setMapModal(false))}
              </View>
            </View>
          </Modal>

          <View style={styles.timeSelect}>
            <TouchableOpacity onPress={() => setOpenPickerVisibility(true)}>
              <Text style={styles.timeSelectButton}>
                {openTime || initialOpenTime}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isOpenPickerVisible}
              mode="time"
              onConfirm={handleOpenConfirm}
              onCancel={() => setOpenPickerVisibility(false)}
            />
            <Text> to </Text>
            <TouchableOpacity onPress={() => setClosedPickerVisibility(true)}>
              <Text style={styles.timeSelectButton}>
                {closedTime || initialCloseTime}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isClosedPickerVisible}
              mode="time"
              onConfirm={handleClosedConfirm}
              onCancel={() => setClosedPickerVisibility(false)}
            />
          </View>

          <View style={styles.tagSelectionContainer}>
            <Text style={styles.tagTitle}>Select Tags</Text>
            <View style={styles.tags}>
              {Tag(
                tags.wheelchairAccessible,
                "wheelchairAccessible",
                "Wheelchair Accessible",
              )}
              {Tag(tags.babyChanging, "babyChanging", "Baby Changing Station")}
              {Tag(
                tags.cleanedRegularly,
                "cleanedRegularly",
                "Cleaned Regularly",
              )}
              {Tag(tags.genderNeutral, "genderNeutral", "Gender Neutral")}
            </View>
          </View>

          <ImageCarousel componentId="facilityForm" />

          <TextInput
            style={styles.input}
            placeholder="Write your description..."
            multiline={true}
            value={description}
            onChangeText={setDescription}
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

          {SecondaryButton("Submit Facility", () => {
            navigation.navigate("Main");
            resetForm();
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
    height: "100%",
  },
  scrollView: {
    backgroundColor: "#afd6ae",
  },
  title: {
    fontSize: 30,
    fontFamily: "EudoxusSans-Bold",
    marginTop: 15,
    paddingTop: 20,
  },
  tagTitle: {
    fontSize: 15,
    fontFamily: "EudoxusSans-Bold",
    marginBottom: 25,
    textAlign: "center",
  },
  icon: {
    marginLeft: "auto",
  },
  subtext: {
    fontSize: 17,
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
  timeSelect: {
    fontSize: 17,
    marginBottom: 10,
    color: "#6da798",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timeSelectButton: {
    fontSize: 17,
    marginTop: 20,
    marginBottom: 10,
    color: "#6da798",
    borderWidth: 1,
    borderColor: "#6da798",
    borderRadius: 20,
    padding: 10,
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
  mapContainer: {
    width: "100%",
    height: "35%",
    marginTop: 20,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  markerModalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  calloutText: {
    alignContent: "center",
    margin: 10,
    flexShrink: 1,
    flex: 1,
  },
  tagSelectionContainer: {
    width: "85%",
    marginVertical: 20,
  },
  tags: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  tagCheckbox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: btnInactive,
    borderRadius: 20,
    padding: 10,
    marginRight: 5,
  },
  tagCheckboxSelected: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: btnActive,
    backgroundColor: "#74C9C0",
    borderRadius: 20,
    padding: 10,
    marginRight: 5,
  },
});
