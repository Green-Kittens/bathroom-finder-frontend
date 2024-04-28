import React, { useState } from "react";
import horizontalCards from "../components/HorizontalCards";
import MainButton from "../components/Buttons";
import { CancelButton } from "../components/Buttons";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { SignedIn, SignedOut} from "@clerk/clerk-expo";
import { useSignOut } from "../hooks/useSignOut";

// types
import { ScreenNavigationProp } from "../navigation/type";

const boomerangimage = { uri: "/assets/images/boomerang.png" };

export default function UserProfileScreen() {
  // navigation
  const navigation = useNavigation<ScreenNavigationProp>();
  const signOut = useSignOut();

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
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {MainButton("Take Photo", addUsingCamera)}
            {MainButton("Choose from Gallery", addFromGallery)}
            {MainButton("Remove Current Image", deleteImage)}
            {CancelButton("Cancel", () => {
              onClose();
            })}
          </View>
        </View>
      </Modal>
    );
  };

  // images uploaded for review
  const [pfp, setImage] = useState(
    "https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png",
  );

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
      setImage(_image.assets[0].uri);
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
      setImage(_image.assets[0].uri);
      setModalVisible(false);
    }
  };

  // delete uploaded image
  const deleteImage = () => {
    setImage(
      "https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png",
    );
    setModalVisible(false);
  };



  return (
    
    <View style={styles.container}>
      <ImageBackground
        source={boomerangimage}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        imageStyle={{
          resizeMode: "cover",
          alignSelf: "flex-end",
        }}
      ></ImageBackground>
        <SignedIn>
          <TouchableOpacity
            style={styles.profilePictureContainer}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Image
              style={styles.profilePicture}
              source={{
                uri: pfp,
              }}
            />
            <Text>Your Name</Text>
          </TouchableOpacity>
          
          <ImageUploader
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
          
          {horizontalCards("Your Reviews")}
          {horizontalCards("Your Favorites")}
          <View>
            <View style={[{ backgroundColor: "none" }]}>
              <View
                style={{
                  marginVertical: 20,
                  backgroundColor: "none",
                  minWidth: 200,
                }}
              >
                {MainButton("Log Out", () => {
                  signOut();
                })}
              </View>
            </View>
          </View>
        </SignedIn>
        <SignedOut>
          
        </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  signedIn: {
    flex: 1,
    alignSelf: "center",
    backgroundColor: "#EEF8F7",
  },
  signedOut: {
    flex: 1,
    alignSelf: "center",
    backgroundColor: "#EEF8F7",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#EEF8F7",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "EudoxusSans-Bold",
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
});
