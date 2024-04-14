import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

// types
import { ScreenNavigationProp } from "../type";

export default function UserProfileScreen() {
  // navigation
  const navigation = useNavigation<ScreenNavigationProp>();

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
              title="Remove Current Image"
              color="#344f33"
              onPress={deleteImage}
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
  const [pfp, setImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/b/b2/Hausziege_04.jpg",
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
      "https://upload.wikimedia.org/wikipedia/commons/b/b2/Hausziege_04.jpg",
    );
    setModalVisible(false);
  };

  return (
    <ScrollView>
      <TouchableOpacity
        style={styles.profilePictureContainer}
        onPress={() => {
          setModalVisible(true);
        }}
      >
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
        <View style={{ marginHorizontal: "40%", marginVertical: 5 }}>
          <Button
            title="Log Out"
            onPress={() => {
              navigation.navigate("Login");
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

function horizontalCards(title: string) {
  return (
    <View>
      <Text style={{ margin: 10 }}>{title}</Text>
      <ScrollView horizontal={true} style={styles.horizontalScroll}>
        {card()}
        {card()}
        {card()}
        {card()}
        {card()}
        {card()}
        {card()}
        {card()}
      </ScrollView>
    </View>
  );
}

function card() {
  return <View style={styles.card} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
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
  imageLink: {
    marginRight: 10,
    color: "blue",
  },
});
