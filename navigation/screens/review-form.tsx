import React from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  Modal,
  Linking,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { MaterialIcons } from "@expo/vector-icons";
import StarRating from "react-native-star-rating-widget";
import { createReview } from "@/controllers/reviewController";

// screens
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

// type
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

//username: string, bathroomID: string
//^need to be passed as params in tabreview form

export default function TabReviewForm() {
  // const handleReview = async () => {
  //   try {
  //     const review = await createReview(
  //       username,
  //       bathroomID,
  //       description,
  //       rating,
  //       time,
  //     );
  //   } catch (error) {
  //     console.error("Error creating new review:", error);
  //   }
  // };

  // location
  const [, setLocation] = useState("");

  // getting current date and time
  const currentDate = new Date();

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

  // images uploaded for review
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

  // rating
  const [rating, setRating] = useState(0);

  // post rating (submit button)
  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <ScrollView>
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

        {images.length === 3 && (
          <Text style={styles.errorText}>
            You can only upload a max of 3 photos.
          </Text>
        )}
        {images.length < 3 && (
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

        {images.length !== 0 &&
          images.map((currImage, idx) => (
            <View key={idx} style={styles.imageContainer}>
              <TouchableOpacity
                onPress={() => Linking.openURL(currImage.assets[0].uri)}
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

        <Text style={styles.subtext}>Rate Your Experience:</Text>
        <StarRating
          style={styles.starRating}
          rating={rating}
          onChange={setRating}
          enableHalfStar={false}
        />

        <Button
          title="Post Rating"
          color="#344f33"
          onPress={
            // make a check to make sure that all fields are filled out
            navigation.navigate("Main")
          }
        />
      </View>
    </ScrollView>
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
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageLink: {
    marginRight: 10,
    color: "blue",
  },
});
