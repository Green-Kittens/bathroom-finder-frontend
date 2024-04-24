//facility-form.tsx
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { HorizontalCards } from "../../components/Carousel";
import { useImages } from "../../contexts/ImageContext"; // Ensure the import path is correct
import { ScreenNavigationProp } from "../type";
import MainButton, { CancelButton } from "../../components/Buttons";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import axios from 'axios'; 

export default function FacilityForm() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { addImage } = useImages();
  const [description, setDescription] = useState("");
  const [openTime, setOpenTime] = useState<Date | null>(null);
  const [closedTime, setClosedTime] = useState<Date | null>(null);
  const [isOpenPickerVisible, setOpenPickerVisibility] = useState(false);
  const [isClosedPickerVisible, setClosedPickerVisibility] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [mapModal, setMapModal] = useState(false);
  const [markerAddress, setMarkerAddress] = useState("");
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject | null>(null);

  const handleOpenConfirm = (date: Date) => {
    setOpenTime(date);
    setOpenPickerVisibility(false);
  };

  const handleClosedConfirm = (date: Date) => {
    setClosedTime(date);
    setClosedPickerVisibility(false);
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
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Add a New Facility</Text>
        {currentLocation ? (
          <MapView
            style={styles.mapContainer}
            showsUserLocation={true}
            initialRegion={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              draggable // enables user to drag to desired location
              tappable // enables user to tap the marker
              coordinate={{
                latitude: currentLocation.coords.latitude + 0.001,
                longitude: currentLocation.coords.longitude + 0.001,
              }}
              onPress={ async (e) => {
                const { latitude, longitude } = e.nativeEvent.coordinate;
                try {
                    const response = await axios.get(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                    );
                    setMarkerAddress(response.data.display_name);
                    setMapModal(true);
                } catch (error) {
                    console.error("Error fetching address:", error);
                }
              }}
            />
          </MapView>
        ) : (
          <Text style={styles.subtext}>Fetching current location...</Text>
        )}

        <Text>Drag and click pin marker to change and see address</Text>

        <Modal
          animationType="slide"
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
              {openTime ? openTime.toLocaleTimeString() : "Open Time"}
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
              {closedTime ? closedTime.toLocaleTimeString() : "Close Time"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isClosedPickerVisible}
            mode="time"
            onConfirm={handleClosedConfirm}
            onCancel={() => setClosedPickerVisibility(false)}
          />
        </View>
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
        <HorizontalCards />
        {MainButton("Submit Facility", () => navigation.navigate("Main"))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#afd6ae",
    color: "#344f33",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#afd6ae",
  },
  title: {
    fontSize: 30,
    fontFamily: "EudoxusSans-Bold",
    marginTop: 20,
    color: "#344f33",
  },
  icon: {
    marginLeft: "auto",
  },
  subtext: {
    fontSize: 17,
    marginTop: 20,
    marginBottom: 20,
    color: "#344f33",
    textAlign: "center",
  },
  errorText: {
    fontSize: 17,
    marginBottom: 20,
    color: "red",
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
    alignContent: "center",
  },
  timeSelect: {
    fontSize: 17,
    marginTop: 20,
    marginBottom: 20,
    color: "#344f33",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timeSelectButton: {
    fontSize: 17,
    marginTop: 10,
    marginBottom: 20,
    color: "#344f33",
    borderWidth: 1,
    borderColor: "#344f33",
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
    height: "25%",
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
    fontWeight: 'bold',
  },
});
