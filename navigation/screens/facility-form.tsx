//facility-form.tsx
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
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

const boomerangimage = { uri: "/assets/images/boomerang.png" };

export default function FacilityForm() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { addImage } = useImages("facilityForm");
  const [description, setDescription] = useState("");
  const [openTime, setOpenTime] = useState<Date | null>(null);
  const [closedTime, setClosedTime] = useState<Date | null>(null);
  const [isOpenPickerVisible, setOpenPickerVisibility] = useState(false);
  const [isClosedPickerVisible, setClosedPickerVisibility] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={boomerangimage}
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
          <Text style={styles.title}>Add a New Facility</Text>
          <View style={styles.timeSelect}>
            <TouchableOpacity onPress={() => setOpenPickerVisibility(true)}>
              <Text style={styles.timeSelectButton}>
                {openTime
                  ? openTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Open Time"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isOpenPickerVisible}
              mode="time"
              onConfirm={handleOpenConfirm}
              onCancel={() => setOpenPickerVisibility(false)}
            />
            <TouchableOpacity>
              <Text style={[styles.subtext, { marginBottom: 10 }]}> to </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setClosedPickerVisibility(true)}>
              <Text style={styles.timeSelectButton}>
                {closedTime
                  ? closedTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Close Time"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isClosedPickerVisible}
              mode="time"
              onConfirm={handleClosedConfirm}
              onCancel={() => setClosedPickerVisibility(false)}
            />
          </View>
          <ImageCarousel componentId="facilityForm" />
          <TextInput
            style={styles.input}
            placeholder="write your description..."
            placeholderTextColor="#6da798"
            value={description}
            onChangeText={setDescription}
            multiline={true}
          />

          {MainButton("Add Photo", () => setModalVisible(true))}
          {modalVisible && (
            <Modal
              animationType="fade"
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
          {SecondaryButton("Submit Facility", () =>
            navigation.navigate("Main"),
          )}
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
  title: {
    fontSize: 30,
    fontFamily: "EudoxusSans-Bold",
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
    marginBottom: 20,
    color: "#6da798",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timeSelectButton: {
    fontSize: 17,
    marginTop: 10,
    marginBottom: 20,
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
});
