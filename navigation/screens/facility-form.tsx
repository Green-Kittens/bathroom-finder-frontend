import React from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  Modal,
  Alert,
  TouchableOpacity,
  Platform,
  Image,
  ImageBackground,
} from "react-native";

import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MainButton from "../../components/Buttons";
import { CancelButton, SecordaryButton } from "../../components/Buttons";

// type
import { ScreenNavigationProp } from "../type";

const boomerangimage = { uri: "/assets/images/boomerang.png" };

export default function TabReviewForm() {
  // location
  const [, setLocation] = useState("");

  //facility hours
  const [openTime, setOpenTime] = useState(null);
  const [isOpenPickerVisible, setOpenPickerVisibility] = useState(false);
  const showOpenPicker = () => {
    setOpenPickerVisibility(true);
  };
  const hideOpenPicker = () => {
    setOpenPickerVisibility(false);
  };
  const handleOpenConfirm = (time) => {
    setOpenTime(time);
    hideOpenPicker();
  };

  const [closedTime, setClosedTime] = useState(null);
  const [isClosedPickerVisible, setClosedPickerVisibility] = useState(false);
  const showClosedPicker = () => {
    setClosedPickerVisibility(true);
  };
  const hideClosedPicker = () => {
    setClosedPickerVisibility(false);
  };
  const handleClosedConfirm = (time) => {
    setClosedTime(time);
    hideClosedPicker();
  };

  // description
  const [description, setDescription] = useState("");

  // add photo modal
  const [modalVisible, setModalVisible] = useState(false);
  const ImageUploader = ({
    isVisible,
    onClose,
  }: {
    isVisible: boolean;
    onClose: () => void;
  }) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {MainButton("Take Photo", addUsingCamera)}
            {MainButton("Choose From Gallery", addUsingCamera)}
            {CancelButton("Cancel", () => {
              onClose();
            })}
          </View>
        </View>
      </Modal>
    );
  };

  // modal to display image
  const [displayImageVisible, setDisplayImageVisible] = useState(false);
  const [imageToDisplay, setImageToDisplay] = useState("");
  const DisplayImage = ({
    isVisible,
    onClose,
  }: {
    isVisible: boolean;
    onClose: () => void;
  }) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image style={styles.modalImage} source={{ uri: imageToDisplay }} />
            {CancelButton("Cancel", () => {
              onClose();
            })}
          </View>
        </View>
      </Modal>
    );
  };

  // images uploaded
  const [images, setImages] = useState<
    Array<ImagePicker.ImagePickerSuccessResult>
  >([]);

  // permissions
  const [cameraStatus] = ImagePicker.useCameraPermissions();
  const [galleryAccessStatus] = ImagePicker.useMediaLibraryPermissions();

  // add photo from device gallery
  const addFromGallery = async () => {
    if (galleryAccessStatus?.status !== "granted") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("gallery access permission denied");
        return;
      }
    }
    const _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!_image.canceled) {
      images.push(_image);
      setModalVisible(false);
    }
  };

  // add photo using camera
  const addUsingCamera = async () => {
    if (cameraStatus?.status !== "granted") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("camera permission denied");
        return;
      }
    }
    const _image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 1,
    });
    if (!_image.canceled) {
      images.push(_image);
      setModalVisible(false);
    }
  };

  // delete uploaded image
  const deleteImage = (toDelete: ImagePicker.ImagePickerSuccessResult) => {
    const updatedImages = images.filter((curr) => curr !== toDelete);
    setImages(updatedImages);
  };

  // add facility (submit button)
  const navigation = useNavigation<ScreenNavigationProp>();

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
          <View style={styles.dropdown}>
            <RNPickerSelect
              style={styles.dropdown}
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
          <Text style={styles.subtext}>Facility Hours:</Text>
          <View style={styles.timeSelect}>
            <TouchableOpacity onPress={showOpenPicker}>
              <Text style={styles.timeSelectButton}>
                {openTime
                  ? openTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Choose Time"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isOpenPickerVisible}
              mode="time"
              onConfirm={handleOpenConfirm}
              onCancel={hideOpenPicker}
            />
            <TouchableOpacity>
              <Text style={styles.subtext}> to </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={showClosedPicker}>
              <Text style={styles.timeSelectButton}>
                {closedTime
                  ? closedTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Choose Time"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isClosedPickerVisible}
              mode="time"
              onConfirm={handleClosedConfirm}
              onCancel={hideClosedPicker}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="write your description..."
            placeholderTextColor="#6da798"
            value={description}
            onChangeText={setDescription}
            multiline={true}
          />

          {images.length === 3 && (
            <Text style={styles.errorText}>
              You can only upload a max of 3 photos.
            </Text>
          )}
          {images.length < 3 &&
            MainButton("Upload Image", () => {
              setModalVisible(true);
            })}

          <ImageUploader
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
          />

          <DisplayImage
            isVisible={displayImageVisible}
            onClose={() => setDisplayImageVisible(false)}
          />

          {images.length !== 0 &&
            images.map((currImage, idx) => (
              <View key={idx} style={styles.imageContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setImageToDisplay(currImage.assets[0].uri);
                    setDisplayImageVisible(true);
                  }} /*Linking.openURL(currImage.assets[0].uri)}*/
                >
                  <Text style={styles.imageLink}>
                    {currImage.assets[0].fileName}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteImage(currImage)}>
                  <MaterialIcons name="delete" size={20} color="gray" />
                </TouchableOpacity>
              </View>
            ))}

          {SecordaryButton("Submit Facility", () => {
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
    height: "100%",
  },
  title: {
    fontSize: 30,
    fontFamily: "EudoxusSans-Bold",
  },
  dropdown: {
    ...Platform.select({
      ios: {
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
      },
      android: {
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
      },
      web: {
        flexDirection: "row",
        fontSize: 17,
        marginTop: 20,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 8,
      },
    }),
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
