//facility-form.tsx
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ScreenNavigationProp } from "../type";
import { Button } from "../../components/Button";
import MainButton from "../../components/Buttons";
import { MaterialIcons } from "@expo/vector-icons";

// image card for carousel
function card(imageSource: string) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageSource }} style={styles.cardImage} />
    </View>
  );
}

//image carousel
function horizontalCards(images: Array<ImagePicker.ImagePickerSuccessResult>) {
  const tempImagesCount = 5 - images.length;
  const tempImages = Array(tempImagesCount);

  return (
    <View style={styles.container}>
      <Text style={{ margin: 10 }}>Uploaded Images</Text>
      <ScrollView horizontal={true} style={styles.horizontalScroll}>
        {images.map((img) => {
          // Check if img.assets exists and has at least one item
          if (img.assets && img.assets.length > 0 && img.assets[0].uri) {
            return card(img.assets[0].uri);
          }
          return null; // Return null if no uri is found
        })}
        {tempImages.map(
          (src) => card(src), // Use the temp image for empty slots
        )}
      </ScrollView>
    </View>
  );
}

export default function FacilityForm() {
  const navigation = useNavigation<ScreenNavigationProp>();
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

  // add photo modal
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
            <Button
              title="Take Photo"
              color="#344f33"
              onPress={addUsingCamera}
            />
            <Button
              title="Choose from Gallery"
              color="#344f33"
              onPress={addFromGallery}
            />
            <Button
              title="Cancel"
              color="red"
              onPress={() => {
                onClose();
              }}
            />
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
            <Button
              title="Cancel"
              color="red"
              onPress={() => {
                onClose();
              }}
            />
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

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Add a New Facility</Text>
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

        {horizontalCards(images)}

        <TextInput
          style={styles.input}
          placeholder="Write your description..."
          multiline={true}
          value={description}
          onChangeText={setDescription}
        />

        {images.length === 5 && (
          <Text style={styles.errorText}>
            You can only upload a max of 3 photos.
          </Text>
        )}
        {images.length < 5 && (
          <Button
            title="Upload image"
            color="#344f33"
            onPress={() => {
              setModalVisible(true);
            }}
          />
        )}

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
                }}
              >
                <Text style={styles.imageLink}>{"Image #" + (idx + 1)}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteImage(currImage)}>
                <MaterialIcons name="delete" size={20} color="gray" />
              </TouchableOpacity>
            </View>
          ))}

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
