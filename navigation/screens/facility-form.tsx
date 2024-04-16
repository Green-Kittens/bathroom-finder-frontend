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
} from "react-native";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import tempImage from "../../assets/images/tempimage.png";
import { ScreenNavigationProp } from "../type";

//Button component
export function Button(props: {
  onPress: () => void;
  title?: string;
  color?: string;
}) {
  const { onPress, title = "Title", color = "#344f33" } = props;
  return (
    <Pressable
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.buttontext}>{title}</Text>
    </Pressable>
  );
}
// Updated card function to display images
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
  const tempImages = Array(tempImagesCount).fill(tempImage);

  return (
    <View style={styles.container}>
      <Text style={{ margin: 10 }}>Uploaded Images</Text>
      <ScrollView horizontal={true} style={styles.horizontalScroll}>
        {images.map((img, index) => {
          // Check if img.assets exists and has at least one item
          if (img.assets && img.assets.length > 0 && img.assets[0].uri) {
            return card(img.assets[0].uri);
          }
          return null; // Return null if no uri is found
        })}
        {tempImages.map(
          (src, index) => card(src), // Use the temp image for empty slots
        )}
      </ScrollView>
    </View>
  );
}

//TabReviewForm component
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
    if (!_image.canceled && _image.assets && _image.assets.length > 0) {
      setImages((prevImages) => [...prevImages, _image]); // Use spread to create a new array
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
    if (!_image.canceled && _image.assets && _image.assets.length > 0) {
      setImages((prevImages) => [...prevImages, _image]); // Use spread to create a new array
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
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      style={styles.scrollView}
    >
      <View style={styles.container}>
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
            <Text> to </Text>
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
        {horizontalCards(images)}
        <TextInput
          style={styles.input}
          placeholder="write your description..."
          placeholderTextColor="#344f33"
          value={description}
          onChangeText={setDescription}
          multiline={true}
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
        <Button
          title="Add Facility"
          color="#344f33"
          onPress={() => {
            // make a check to make sure that all fields are filled out
            navigation.navigate("Main");
          }}
        />
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
    color: "#344f33",
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
        backgroundColor: "#344f33",
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
        backgroundColor: "#344f33",
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
  button: {
    ...Platform.select({
      ios: {
        fontSize: 17,
        color: "white",
        backgroundColor: "#344f33",
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 20,
      },
      android: {
        fontSize: 17,
        backgroundColor: "#344f33",
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 20,
      },
      web: {
        fontSize: 17,
        color: "black",
        backgroundColor: "#344f33",
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 20,
      },
    }),
  },
  buttontext: {
    ...Platform.select({
      ios: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
      },
      android: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
      },
      web: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
      },
    }),
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
